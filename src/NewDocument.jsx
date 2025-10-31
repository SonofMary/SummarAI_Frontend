import {
  CheckBox,
  CheckCircle,
  ErrorOutline,
  ErrorOutlineTwoTone,
  PersonOutline,
  Replay,
  UploadFile,
} from "@mui/icons-material";
import React, { useState } from "react";
import {
  AiFillFilePdf,
  AiFillFileWord,
  AiFillX,
  AiOutlineProfile,
  AiOutlineRedEnvelope,
} from "react-icons/ai";
import axios from "axios";
import { OutlineXIcon, XIcon } from "flowbite-react";
import Spinner from "./components/Spinner";
import { UseAuth } from "./AuthContext";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactConfetti from "react-confetti";
import { CiPaperplane } from "react-icons/ci";
import { GrRobot } from "react-icons/gr";

function NewDocument() {
  const { token, user } = UseAuth();

  // console.log(token, "token")

  //useStatea
  const [error, setError] = useState(""); //for taking errors

  const [selectedFile, setSelectedFile] = useState(null);

  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState(null);

  //loading useStates
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  //quiz states

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinish, setQuizFinish] = useState(false);
  const [quizQuestionsAnswers, setQuizQuestionsAnswers] = useState([]);
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState([]);

  const [showConfetti, setShowConfetti] = useState(false);

  function handleOption(option) {
    setSelectedOption(option);
    setQuizSelectedAnswers([...quizSelectedAnswers, option]);
  }

  function handleNext() {
    const correct = quiz[currentQuestion].answer;

    setQuizQuestionsAnswers([...quizQuestionsAnswers, correct]);

    if (selectedOption === correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinish(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleSubmitQuiz() {
    const userQuizData = {
      owner: user._id,
      documentTitle: selectedFile.name,
      score: score,
      totalQuestions: quiz.length,
    };

    try {
      const response = axios.post("", userQuizData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "applicaton/json",
        },
      });

      const res = response.data;
    } catch (error) {}
  }
  //file uploading

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      console.log(file);
      //   setProgressQuiz(0);
      //   setProgressSummary(0);
      //   setSummary("");
      //   setQuiz([]);
      //   setScore(0);
      //   setCurrentQuestion(0);
      //   setFinished(false);
      //   setShowConfetti(false); // New: Stop confetti on new file
    }
  }

  //validation of file
  const validateFile = (file) => {
    // const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Oops! Only PDF or DOCX files are allowed. Try again!");
      return false;
    }
    // if (file.size > maxSize) {
    //   setError("Whoa! File is too big (over 10MB). Pick a smaller one!");
    //   return false;
    // }
    setError(""); // Clear any old error
    return true;
  };

  //file icons

  function getFileIcon() {
    if (!selectedFile) return null;
    if (selectedFile.name.endsWith(".pdf"))
      return <AiFillFilePdf className="text-red-500 text-2xl" />;
    if (selectedFile.name.endsWith(".docx"))
      return <AiFillFileWord className="text-blue-500 text-2xl" />;
    return null;
  }

  //PROCESS DOCUMENT AKA GET SUMMARY
  async function getSummary() {
    if (!selectedFile) {
      setError("Hey! Please pick a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoadingSummary(true);
      setError(""); // Clear errors

      const response = await axios.post(
        "https://summarai-backend.onrender.com/summarai/upload-summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          // onUploadProgress: (ProgressEvent) => {
          //   const progressPercentage = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          //   setProgressSummary(progressPercentage);
          // }
        }
      );

      console.log("Upload Successful", response.data);
      setSummary(response.data.summarizedText);
    } catch (error) {
      console.log("Upload failed", error);
      setError(
        "Uh-oh! Something went wrong making the summary. Check your connection and try again."
      );
    } finally {
      setLoadingSummary(false);
      //   setTimeout(() => setProgressSummary(0), 2000);
    }
  }

  async function getQuiz() {
    if (!selectedFile) {
      setError("Hey! Please pick a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoadingQuiz(true);
      setError(""); // Clear errors

      const response = await axios.post(
        "https://summarai-backend.onrender.com/summarai/upload-and-quiz",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          // onUploadProgress: (ProgressEvent) => {
          //   const progressPercentage = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          //   setProgressQuiz(progressPercentage);
          // }
        }
      );

      console.log("Upload Successful", response.data);
      // Fixed: Safer parsing with try-catch
      try {
        const jsonString = response.data.quiz
          .replace(/```json|```/g, "")
          .trim();
        const parsedQuiz = JSON.parse(jsonString);
        console.log(parsedQuiz, "parsedQuiz");
        if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
          setQuiz(parsedQuiz);
        } else {
          setError("Quiz came back empty! Maybe try a different file.");
        }
      } catch (parseError) {
        console.error("Failed to parse quiz:", parseError);
        setError("Oops! Couldn't read the quiz. Try again.");
      }
    } catch (error) {
      console.log("Upload failed", error);
      setError(
        "Uh-oh! Something went wrong making the quiz. Check your connection and try again."
      );
    } finally {
      setLoadingQuiz(false);
      //   setTimeout(() => setProgressQuiz(0), 2000);
    }
  }
  const [chat, setChat] = useState(false)
  const [userPrompt, setUserPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const chatWithAi = async () => {
    const userMessage = {
      sender: "user",
      text: userPrompt,
    };

    setChatMessages((prev) => [...prev, userMessage]);

    setUserPrompt("");
    try {
      const response = await axios.post("https://summarai-backend.onrender.com/summarai/chat", {
        message: userPrompt,
      });
      console.log(response.data);
      const aiMessage = {
        sender: "summarai",
        text: response.data.reply,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "summurai", text: "An error occured" },
      ]);
    }
  };
  return (
    <div>
      {showConfetti && <ReactConfetti />}
      {error && (
        <div className="bg-slate-500 text-white min-w-full">{error}</div>
      )}
      {!selectedFile && !loadingSummary && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-semibold text-xl">Upload Your Document</h1>

          <p className="text-center">
            Upload a PDF or DOCX file to generate summaries, quizzes, and chat
            with AI
          </p>
          <div className="w-8/10 border-dashed border-slate-300 border-2 h-2/5 py-10 flex flex-col justify-center items-center px-24 gap-4 rounded-lg">
            <div className="rounded-full p-2 bg-slate-300 max-w-fit scale-150">
              <UploadFile />
            </div>
            <p className="text-center">
              Drag and drop your file here, or{" "}
              <span className="font-semibold">
                <label htmlFor="file-upload">
                  browse{" "}
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleUpload}
                    accept=".pdf,.docx"
                  />
                </label>
              </span>
            </p>
            <p className="text-center">Supported formats: PDF, DOCX</p>
          </div>
        </div>
      )}

      {selectedFile && !loadingSummary && !summary && (
        <div className="px-16 ml-24 mr-24">
          <div className=" border-dashed border-slate-300 border-2 h-2/5 py-8 flex  items-center px-4 gap-4 rounded-lg">
            <div className="bg-blue-200 p-2">{getFileIcon()}</div>
            <div>
              <p>{selectedFile.name}</p>
              <p>{Math.round(selectedFile.size / 1024)} KB</p>
            </div>{" "}
            <div
              onClick={() => setSelectedFile(null)}
              className="hover:bg-slate-300 p-2 ml-auto"
            >
              {<XIcon />}
            </div>{" "}
          </div>
          <div
            className="text-white bg-black text-center mt-4 py-1 rounded-lg"
            onClick={getSummary}
          >
            Process Document
          </div>
        </div>
      )}

      {loadingSummary && (
        <div>
          <div className="border-dashed border-slate-300 border-2 py-8 flex flex-col items-center justify-center gap-2 rounded-lg">
            <div>
              <Spinner />
            </div>
            <p>Processing your document</p>
            <p>SummarAI is analyzing your document and generating insights</p>
          </div>
        </div>
      )}

      {summary && !quiz && !chat && (
        <div className="flex flex-col gap-4 items-center  px-6 sm:px-12 md:px-24">
          {/* Block 1 — Summary Header */}
          <div className="w-full max-w-4xl bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl text-gray-800  flex items-center gap-2">
              {getFileIcon()}
              {selectedFile.name}
            </h3>
            <p className="text-gray-500">Document processed successfully</p>
          </div>

          {/* Block 2 — Formatted Markdown */}
          <div className="w-full max-w-4xl bg-white rounded-2xl  p-8 border border-gray-100">
            <div className="prose prose-h1:text-lg max-w-none leading-relaxed prose-h2:text-base prose-h1:font-medium prose-h2:font-semibold">
              <div>
                <p className="font-semibold">Summary</p>
                <p>AI-generated overview of your document</p>
              </div>
              <ReactMarkDown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {summary}
              </ReactMarkDown>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            {!loadingQuiz && (
              <button
                className="bg-slate-500 text-white p-4 w-1/2 rounded-lg"
                onClick={getQuiz}
              >
                <p>Generate Quiz</p>
                <small>Test your undestanding</small>
              </button>
            )}
            {loadingQuiz && (
              <button
                className="bg-slate-500 text-white p-4 w-1/2 rounded-lg"
                onClick={getQuiz}
              >
                <Spinner />
              </button>
            )}
            <button className="bg-white text-black p-4 w-1/2 hover:bg-slate-300 rounded-lg" onClick={()=> setChat(true)}>
              <p>Chat with Docz</p>
              <small>Ask questions about the document</small>
            </button>
          </div>
        </div>
      )}

      {quiz && !quizFinish && (
        <div className="w-4/6 mx-auto flex flex-col gap-2">
          {/* //Progesss */}
          <div>
            Quetion {currentQuestion + 1} of {quiz.length}{" "}
          </div>
          <div className="bg-slate-300 h-2">
            <div
              className={`bg-black`}
              style={{ width: `${((currentQuestion + 1 )/ quiz.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex flex-col gap-2">
            {quiz[currentQuestion].question}
            <p>Select the correct answer</p>
            {quiz[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border-2 focus:bg-orange-600 rounded-lg  ${
                  selectedOption === option
                    ? "bg-blue-400 text-white border-blue-800"
                    : "hover:bg-slate-400"
                }`}
                onClick={() => handleOption(option)}
              >
                {option}
              </div>
            ))}
            <div className="flex gap-2">

            
            <button onClick={handlePrevious} className="w-1/2 border-2 p-2 rounded-md">Previous</button>
            <button onClick={handleNext} className="w-1/2 border-2 p-2 rounded-md bg-slate-500 text-white">
              {currentQuestion + 1 < quiz.length ? "Next" : "Finish"}
            </button>
            </div>
          </div>
        </div>
      )}

      {quizFinish && (
        <div className="flex flex-col items-center gap-4 border-2 rounded-xl p-5 w-fit mx-auto">
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Quiz Complete!</p>
            <p>Here are your results</p>
            <div className="w-20 h-20 bg-slate-300 rounded-full text-black p-4 flex items-center justify-center">
              {(score / quiz.length) * 100}%
            </div>
            <p>{`You scored ${score} out of ${quiz.length}`}</p>
          </div>
          <div className="flex flex-col justify-center">
            {quiz.map((questionBlock, index) => (
              <div
                className={`border-2 rounded-lg p-4 mb-3 flex flex-col gap-2 ${
                  quizQuestionsAnswers[index] === quizSelectedAnswers[index]
                    ? "border-green-400"
                    : "border-red-300"
                }`}
              >
                <p className="font-semibold flex items-center gap-2">
                  <span>
                    {quizQuestionsAnswers[index] ===
                    quizSelectedAnswers[index] ? (
                      <CheckCircle className="text-green-300" />
                    ) : (
                      <OutlineXIcon className="text-red-500" />
                    )}
                  </span>
                  {questionBlock.question}
                </p>
                <p className="text-green-600">
                  Correct: {quizQuestionsAnswers[index]}
                </p>
                <p
                  className={`${
                    quizQuestionsAnswers[index] === quizSelectedAnswers[index]
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  Your Answer: {quizSelectedAnswers[index]}
                </p>
              </div>
            ))}
          </div>
          <button
            className="flex gap-2 items-center"
            onClick={() => {
              setQuizFinish(false);
              setScore(0);
              setCurrentQuestion(0);
              setSelectedOption("");
              setQuizQuestionsAnswers([]);
              setQuizSelectedAnswers([]);
              setShowConfetti(false);
            }}
          >
            <Replay />
            Retake Quiz
          </button>
        </div>
      )}

      {chat &&  (
        <>
          <div>
            <div className="flex flex-col h-screen">
              {chatMessages.map((chat, index) => (
                <div key={index} className="flex flex-col ">
                  <div
                    className={`p-2 items-start justify-start flex gap-1 ${
                      chat.sender === "user"
                        ? " bg-cyan-400 text-black max-w-xl rounded-lg flex  self-start mb-2"
                        : "text-cyan-400 bg-black max-w-xl flex self-end rounded-lg mb-2"
                    }`}
                  >{chat.sender === "user" ? <PersonOutline/> : <GrRobot/>}
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex bottom-2 sticky gap-2 ">
            <input
              type="text" className="w-5/6 rounded-md" placeholder="Type your message here"
              onChange={(e) => setUserPrompt(e.target.value)}
              value={userPrompt}
            />
            <button onClick={() => chatWithAi()} className="border-none bg-slate-200 p-2 text-2xl rounded-md">
              <CiPaperplane />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NewDocument;
