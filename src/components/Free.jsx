import {
  CheckCircle,
  PersonOutline,
  Replay,
  UploadFile,
} from "@mui/icons-material";
import React, { useState } from "react";
import { AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import axios from "axios";
import Spinner from "./Spinner";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactConfetti from "react-confetti";
import { CiPaperplane } from "react-icons/ci";
import { GrRobot } from "react-icons/gr";
import { OutlineXIcon, XIcon } from "flowbite-react";

function Free() {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinish, setQuizFinish] = useState(false);
  const [quizQuestionsAnswers, setQuizQuestionsAnswers] = useState([]);
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [activeSection, setActiveSection] = useState("upload")

  // FIXED: handleOption function (same as NewDocument)
  const handleOption = (option) => {
    setSelectedOption(option);
    const newSelectedAnswers = [...quizSelectedAnswers];
    newSelectedAnswers[currentQuestion] = option;
    setQuizSelectedAnswers(newSelectedAnswers);
  };

  // FIXED: handleNext function (same as NewDocument)
  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an answer before proceeding!");
      return;
    }

    const correctAnswer = quiz[currentQuestion].answer;
    
    console.log("Current question:", currentQuestion);
    console.log("Selected option:", selectedOption);
    console.log("Correct answer:", correctAnswer);
    console.log("Are they equal?", selectedOption === correctAnswer);
    
    // Update score if correct - comparing full text (same as NewDocument)
    if (selectedOption === correctAnswer) {
      console.log("Adding to score!");
      setScore(prevScore => prevScore + 1);
    }

    // Store the answers (same as NewDocument)
    const newSelectedAnswers = [...quizSelectedAnswers];
    newSelectedAnswers[currentQuestion] = selectedOption; // Store full text for display
    setQuizSelectedAnswers(newSelectedAnswers);

    const newCorrectAnswers = [...quizQuestionsAnswers];
    newCorrectAnswers[currentQuestion] = correctAnswer; // Store full text for display
    setQuizQuestionsAnswers(newCorrectAnswers);

    console.log("Updated selected answers:", newSelectedAnswers);
    console.log("Updated correct answers:", newCorrectAnswers);

    // Move to next question or finish (same as NewDocument)
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(quizSelectedAnswers[currentQuestion + 1] || "");
    } else {
      setQuizFinish(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // FIXED: handlePrevious function (same as NewDocument)
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(quizSelectedAnswers[currentQuestion - 1] || "");
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setSummary("");
      setQuiz(null);
      setScore(0);
      setCurrentQuestion(0);
      setSelectedOption("");
      setQuizFinish(false);
      setQuizSelectedAnswers([]);
      setQuizQuestionsAnswers([]);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Oops! Only PDF or DOCX files are allowed. Try again!");
      return false;
    }
    setError("");
    return true;
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    if (selectedFile.name.endsWith(".pdf"))
      return <AiFillFilePdf className="text-red-500 text-2xl" />;
    if (selectedFile.name.endsWith(".docx"))
      return <AiFillFileWord className="text-blue-500 text-2xl" />;
    return null;
  };

  const getSummary = async () => {
    if (!selectedFile) return setError("Hey! Please pick a file first.");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoadingSummary(true);
      setError("");
      const response = await axios.post(
        "https://summarai-backend.onrender.com/summarai/free/upload-summarize",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSummary(response.data.summarizedText);
      setExtractedText(response.data.extractedText);
      setActiveSection("summary")
    } catch (error) {
      console.log("Upload failed", error);
      setError("Error creating summary. Please try again.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const getQuiz = async () => {
    if (!selectedFile) return setError("Hey! Please pick a file first.");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoadingQuiz(true);
      setError("");
      const response = await axios.post(
        "https://summarai-backend.onrender.com/summarai/free/upload-and-quiz",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const jsonString = response.data.quiz.replace(/```json|```/g, "").trim();
      const parsedQuiz = JSON.parse(jsonString);
      if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0)
        setQuiz(parsedQuiz);
      else setError("Quiz came back empty! Try a different file.");
      setActiveSection("quiz");
    } catch (error) {
      console.log("Upload failed", error);
      setError("Error generating quiz. Please try again.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  const chatWithAi = async () => {
    const userMessage = { sender: "user", text: userPrompt };
    setChatMessages((prev) => [...prev, userMessage]);
    setUserPrompt("");

    try {
      const response = await axios.post(
        "https://summarai-backend.onrender.com/summarai/free/chat",
        { message: userPrompt, extractedText }
      );
      const aiMessage = {
        sender: "summarai",
        text: response.data.reply,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "summarai", text: "An error occurred." },
      ]);
    }
  };

  const resetToUpload = () => {
    setSelectedFile(null);
    setSummary("");
    setQuiz(null);
    setChatMessages([]);
    setActiveSection("upload");
    setError("");
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption("");
    setQuizFinish(false);
    setQuizSelectedAnswers([]);
    setQuizQuestionsAnswers([]);
  };

  // Reset function for quiz (same as NewDocument)
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setQuizFinish(false);
    setQuizSelectedAnswers([]);
    setQuizQuestionsAnswers([]);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-16 py-6 bg-gray-50">
      {showConfetti && <ReactConfetti />}
      {error && (
        <div className="bg-red-500 text-white py-2 px-4 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {(selectedFile || summary) && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${
                activeSection === "summary" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveSection("summary")}
            >
              Summary
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeSection === "quiz" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveSection("quiz")}
            >
              Quiz
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeSection === "chat" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveSection("chat")}
            >
              Chat
            </button>
          </div>
          
          <button
            onClick={resetToUpload}
            className="flex items-center gap-2  text-slate-400 border-2 py-2 px-4 rounded-lg hover:bg-slate-400 hover:text-white transition text-xs"
          >
            <UploadFile className="text-sm text-slate-400 hover:text-black " />
            Upload New Document
          </button>
        </div>
      )}

      {/* Upload section */}
      {activeSection === "upload" && !selectedFile && !loadingSummary && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-semibold text-2xl">Upload Your Document</h1>
          <p className="text-gray-600 max-w-md">
            Upload a PDF or DOCX file to generate summaries, quizzes, and chat
            with AI.
          </p>

          <div className="w-full sm:w-4/5 md:w-2/3 border-2 border-dashed border-slate-300 py-10 flex flex-col justify-center items-center gap-4 rounded-lg bg-white shadow-sm">
            <div className="rounded-full p-3 bg-slate-300">
              <UploadFile className="scale-150" />
            </div>
            <p>
              Drag and drop your file here, or{" "}
              <label
                htmlFor="file-upload"
                className="font-semibold text-blue-600 cursor-pointer"
              >
                browse
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleUpload}
                  accept=".pdf,.docx"
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">Supported formats: PDF, DOCX</p>
          </div>
        </div>
      )}

      {/* Selected file */}
      {activeSection === "upload" && selectedFile && !loadingSummary && !summary && (
        <div className="max-w-3xl mx-auto mt-6">
          <div className="border-2 border-dashed border-slate-300 flex items-center p-4 rounded-lg bg-white shadow-sm">
            <div className="bg-blue-200 p-2 rounded">{getFileIcon()}</div>
            <div className="ml-4">
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {Math.round(selectedFile.size / 1024)} KB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="ml-auto hover:bg-slate-200 p-2 rounded-full"
            >
              <XIcon />
            </button>
          </div>

          <button
            onClick={getSummary}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Process Document
          </button>
        </div>
      )}

      {/* Loading */}
      {loadingSummary && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner />
          <p className="font-medium">Processing your document...</p>
          <p className="text-sm text-gray-500">
            SummarAI is analyzing your document and generating insights.
          </p>
        </div>
      )}

      {/* Summary view */}
      {activeSection === "summary" && summary && (
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getFileIcon()} 
                <div>
                  <h3 className="text-xl font-semibold">{selectedFile.name}</h3>
                  <p className="text-gray-500 text-sm">Document processed successfully</p>
                </div>
              </div>
              <button
                onClick={resetToUpload}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
              >
                <Replay className="text-sm" />
                Change File
              </button>
            </div>
          </div>

          <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm border">
             <div className="prose prose-h1:text-lg max-w-none leading-relaxed prose-h2:text-base prose-h1:font-medium prose-h2:font-semibold">
                <p className="font-semibold mb-2">Summary</p>
            <p className="text-gray-600 mb-4 text-sm">
              AI-generated overview of your document:
            </p>
            <ReactMarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {summary}
            </ReactMarkDown>
             </div>
          
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
            <button
              onClick={getQuiz}
              className="bg-blue-400 text-white py-3 rounded-lg w-full sm:w-1/2 hover:bg-blue-600 transition"
            >
              {loadingQuiz ? <Spinner /> : "Generate Quiz"}
            </button>
            <button
              onClick={() => setActiveSection("chat")}
              className="bg-white text-black py-3 rounded-lg border hover:bg-gray-100 w-full sm:w-1/2 transition"
            >
              Chat with Docz
            </button>
          </div>
        </div>
      )}

      {/* Quiz view - UPDATED: Using the same quiz logic as NewDocument */}
      {activeSection === "quiz" && quiz && (
        <div className="max-w-3xl mx-auto mt-6">
          {!quizFinish ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Quiz</h3>
                <span className="text-gray-500">
                  Question {currentQuestion + 1} of {quiz.length}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="bg-slate-300 h-2 mb-6 rounded-full">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                ></div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-4">
                  {quiz[currentQuestion].question}
                </h4>
                <p className="text-gray-600 mb-4">Select the correct answer</p>
                <div className="space-y-3">
                  {quiz[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedOption === option
                          ? "bg-blue-400 text-white border-blue-800"
                          : "border-gray-300 hover:bg-slate-100"
                      }`}
                      onClick={() => handleOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`w-1/2 border-2 p-2 rounded-md ${
                    currentQuestion === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="w-1/2 border-2 p-2 rounded-md bg-slate-500 text-white hover:bg-slate-600"
                >
                  {currentQuestion + 1 < quiz.length ? "Next" : "Finish"}
                </button>
              </div>
            </div>
          ) : (
            // Quiz Results - UPDATED: Using the same logic as NewDocument
            <div className="flex flex-col items-center gap-4 border-2 rounded-xl p-5 w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-2xl font-bold">Quiz Complete!</p>
                <p className="text-lg">Here are your results</p>
                <div className="w-20 h-20 bg-slate-300 rounded-full text-black p-4 flex items-center justify-center text-xl font-bold">
                  {Math.round((score / quiz.length) * 100)}%
                </div>
                <p className="text-xl">{`You scored ${score} out of ${quiz.length}`}</p>
              </div>

              <div className="flex flex-col justify-center w-full">
                {quiz.map((questionBlock, index) => {
                  const userAnswer = quizSelectedAnswers[index];
                  const correctAnswer = quizQuestionsAnswers[index];
                  const isCorrect = userAnswer === correctAnswer;
                  
                  return (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-4 mb-3 flex flex-col gap-2 ${
                        isCorrect ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50"
                      }`}
                    >
                      <p className="font-semibold flex items-center gap-2">
                        <span>
                          {isCorrect ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <OutlineXIcon className="text-red-500" />
                          )}
                        </span>
                        Q{index + 1}: {questionBlock.question}
                      </p>
                      <div className="ml-6 space-y-2">
                        <p className={`${isCorrect ? "text-green-600" : "text-red-500"} font-medium`}>
                          Your Answer: {userAnswer || "Not answered"}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600 font-medium">
                            Correct Answer: {correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={resetQuiz}
                className="flex gap-2 items-center bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <Replay />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chat view */}
      {activeSection === "chat" && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border h-[70vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <GrRobot className="text-4xl mx-auto mb-2" />
                  <p>Start a conversation with your document</p>
                </div>
              ) : (
                chatMessages.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      chat.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs sm:max-w-md text-sm flex items-start gap-2 ${
                        chat.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {chat.sender === "user" ? <PersonOutline /> : <GrRobot />}
                      {chat.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask something about your document..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && chatWithAi()}
                />
                <button
                  onClick={chatWithAi}
                  disabled={!userPrompt.trim()}
                  className={`p-3 rounded-lg text-white ${
                    userPrompt.trim()
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-400 cursor-not-allowed"
                  } transition`}
                >
                  <CiPaperplane />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Free;