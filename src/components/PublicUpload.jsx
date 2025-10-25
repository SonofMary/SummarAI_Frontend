import React, { useState } from 'react'
import { GrDocumentUpload } from "react-icons/gr";
import { CiFaceSmile } from "react-icons/ci";
import { AiFillFilePdf, AiFillFileWord, AiOutlineRedEnvelope } from "react-icons/ai";
import axios from 'axios';
import ReactMarkdown from "react-markdown"
import Confetti from 'react-confetti'; // New: For party confetti! (npm install react-confetti)

function PublicUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(""); // New: For showing errors to user

  // Loader
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [summary, setSummary] = useState("");
  const [progressSummary, setProgressSummary] = useState(0);
  const [progressQuiz, setProgressQuiz] = useState(0);

  // Quiz section
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); // New: For quiz feedback
  const [isCorrect, setIsCorrect] = useState(false); // New: Track if answer is right

  // New: For confetti party!
  const [showConfetti, setShowConfetti] = useState(false);

  // Tabs and drag/drop states
  const [activeTab, setActiveTab] = useState('upload'); 
  const [isDragging, setIsDragging] = useState(false);

  // New: Validate file (type and size <10MB)
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setError("Oops! Only PDF or DOCX files are allowed. Try again!");
      return false;
    }
    if (file.size > maxSize) {
      setError("Whoa! File is too big (over 10MB). Pick a smaller one!");
      return false;
    }
    setError(""); // Clear any old error
    return true;
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      console.log(file);
      setProgressQuiz(0);
      setProgressSummary(0);
      setSummary("");
      setQuiz([]);
      setScore(0);
      setCurrentQuestion(0);
      setFinished(false);
      setShowConfetti(false); // New: Stop confetti on new file
    }
  }

  function getFileIcon() {
    if (!selectedFile) return null;
    if (selectedFile.name.endsWith(".pdf")) return <AiFillFilePdf className='text-red-500 text-9xl' />;
    if (selectedFile.name.endsWith(".docx")) return <AiFillFileWord className='text-blue-500 text-9xl' />;
    return null;
  }

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

      const response = await axios.post("http://localhost:3000/summarai/upload-summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const progressPercentage = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          setProgressSummary(progressPercentage);
        }
      });

      console.log("Upload Successful", response.data);
      setSummary(response.data.summarizedText);

    } catch (error) {
      console.log("Upload failed", error);
      setError("Uh-oh! Something went wrong making the summary. Check your connection and try again.");
    } finally {
      setLoadingSummary(false);
      setTimeout(() => setProgressSummary(0), 2000);
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

      const response = await axios.post("http://localhost:3000/summarai/upload-and-quiz", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const progressPercentage = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          setProgressQuiz(progressPercentage);
        }
      });

      console.log("Upload Successful", response.data);
      // Fixed: Safer parsing with try-catch
      try {
        const parsedQuiz = JSON.parse(response.data.quiz);
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
      setError("Uh-oh! Something went wrong making the quiz. Check your connection and try again.");
    } finally {
      setLoadingQuiz(false);
      setTimeout(() => setProgressQuiz(0), 2000);
    }
  }

  function handlenext() {
    const correct = quiz[currentQuestion].answer;
    const isRight = selectedAnswer === correct;
    setIsCorrect(isRight);
    if (isRight) setScore(score + 1);
    setShowFeedback(true); // New: Show feedback briefly

    // Hide feedback after 2 seconds and advance
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        setFinished(true);
        setShowConfetti(true); // New: Start confetti party on finish!
        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 2000);
  }

  const handleSelectedOption = (option) => setSelectedAnswer(option);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const fakeEvent = { target: { files: [files[0]] } };
      handleUpload(fakeEvent);
    }
  };

const [userPrompt, setUserPrompt] = useState("")
const [chatMessages, setChatMessages] = useState([])

  const chatWithAi = async() => {

    const userMessage = {
      sender: "user", text: userPrompt
    }

    setChatMessages((prev) => [...prev, userMessage

    ])

    setUserPrompt("")
    try {
    const response = await axios.post("http://localhost:3000/summarai/chat", {message: userPrompt})
    console.log(response.data)
       const aiMessage = {
      sender: "summarai", text: response.data.reply
    }
    setChatMessages((prev) => [...prev, aiMessage])
      
    } catch (error) {
      console.log(error)
      setChatMessages((prev)=> [...prev, {sender: "summurai", text: "An error occured"}])

      
    }
   



  }

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 relative"> {/* New: relative for confetti */}
      {/* New: Confetti Party! */}
      {showConfetti && <Confetti />}
      
      {/* Header - Updated */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          SummarAI
        </h1>
        <p className="text-gray-600 text-lg">Your AI learning companion 🤖</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Tabs - Updated Colors */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-4 font-medium transition-all duration-200 ${
              activeTab === 'upload' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-purple-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('upload')}
            aria-label="Upload Document Tab" // New: Accessibility
          >
            📁 Upload Document <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><mask id="SVGkvAkxeeu"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" fill-opacity="0" stroke-dasharray="64" stroke-dashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate fill="freeze" attributeName="fill-opacity" begin="1.015s" dur="0.725s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.87s" values="64;0"/></path><path stroke="#000" stroke-dasharray="2" stroke-dashoffset="2" d="M9 9v1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.74s" dur="0.29s" values="2;0"/></path><path stroke="#000" stroke-dasharray="2" stroke-dashoffset="2" d="M14.5 9.5h1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="2.03s" dur="0.29s" values="2;0"/></path><path stroke="#000" stroke-dasharray="12" stroke-dashoffset="12" d="M8 14c0.5 1.5 1.79 3 4 3c2.21 0 3.5 -1.5 4 -3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="2.32s" dur="0.29s" values="12;0"/></path></g></mask><rect width="24" height="24" fill="#e44544" mask="url(#SVGkvAkxeeu)"/></svg>
          </button>
          <button 
            className={`flex-1 py-4 font-medium transition-all duration-200 ${
              activeTab === 'summary' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-purple-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('summary')}
            disabled={!summary}
            aria-label="AI Summary Tab" // New: Accessibility
          >
            📝 AI Summary
          </button>
          <button 
            className={`flex-1 py-4 font-medium transition-all duration-200 ${
              activeTab === 'quiz' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-purple-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('quiz')}
            disabled={quiz.length === 0}
            aria-label="Knowledge Check Tab" // New: Accessibility
          >
            🧠 Knowledge Check
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Error Message Display - New */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-medium">
              {error}
              <button 
                onClick={() => setError("")} 
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label="Dismiss error message"
              >
                ✕
              </button>
            </div>
          )}

          {/* Upload Tab - Enhanced */}
          {activeTab === 'upload' && (
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 sm:p-8 ${ // New: Responsive padding
                isDragging 
                  ? 'border-purple-400 bg-purple-50 shadow-inner' 
                  : 'border-gray-300 hover:border-purple-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <>
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-lg">
                    <GrDocumentUpload className="text-4xl text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Drop your document here</h3>
                  <p className="text-gray-600 mb-6">PDF or DOCX files only • Max 10MB</p>
                  <label className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium">
                    📄 Choose File
                    <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.docx" />
                  </label>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center mb-6">
                    {getFileIcon()}
                  </div>
                  <p className="text-lg font-medium mb-2 text-gray-800">{selectedFile.name}</p>
                  <p className="text-gray-600 mb-6">{Math.round(selectedFile.size / 1024)} KB</p>
                  
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button 
                      onClick={getSummary} 
                      disabled={loadingSummary || loadingQuiz}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                      aria-label="Generate Summary Button" // New: Accessibility
                    >
                      {loadingSummary ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        '✨'
                      )}
                      Generate Summary
                    </button>
                    
                    <button 
                      onClick={getQuiz} 
                      disabled={loadingSummary || loadingQuiz}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                      aria-label="Generate Quiz Button" // New: Accessibility
                    >
                      {loadingQuiz ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        '🎯'
                      )}
                      Generate Quiz
                    </button>
                  </div>

                  {/* Progress Bars */}
                  {(progressSummary > 0 || progressQuiz > 0) && (
                    <div className="mt-6 space-y-3 max-w-md mx-auto">
                      {progressSummary > 0 && (
                        <div className="text-left">
                          <span className="text-sm font-medium text-gray-600 mb-1 block">Summary: {progressSummary}%</span> {/* New: Consistent font */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${progressSummary}%`}} />
                          </div>
                        </div>
                      )}
                      {progressQuiz > 0 && (
                        <div className="text-left">
                          <span className="text-sm font-medium text-gray-600 mb-1 block">Quiz: {progressQuiz}%</span> {/* New: Consistent font */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{width: `${progressQuiz}%`}} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Summary Tab - Enhanced */}
          {activeTab === 'summary' && summary && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <CiFaceSmile className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">AI Summary</h3>
                  <p className="text-gray-600 text-sm">Generated by our intelligent AI</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-h-96 overflow-y-auto">
                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <ReactMarkdown>
                  {summary}
                  </ReactMarkdown>
                  <button>Discuss with Summarai</button>
                  <div>
                    <div>{chatMessages.map((chat, index) => (
                      <div key={index} className='flex flex-col '> 
                        <div className={`p-2 items-start justify-start ${chat.sender === 'user' ? ' bg-cyan-400 text-black max-w-xl rounded-lg flex  self-start mb-2' : 'text-cyan-400 bg-black max-w-xl flex self-end rounded-lg mb-2'}`}>{chat.text}</div>
                      </div>
                    ))}</div>
                  </div>
                  
                </article>
              </div> 
            </div>
          )}

          {/* Quiz Tab - Enhanced */}
          {activeTab === 'quiz' && quiz.length > 0 && (
            <div className="max-w-2xl mx-auto">
              {finished ? (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">Quiz Completed!</h3>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 border border-purple-200">
                    <p className="text-4xl font-bold text-purple-600 mb-2">{score}/{quiz.length}</p>
                    <p className="text-gray-600">
                      {score === quiz.length ? 'Perfect! 🏆' : 
                       score >= quiz.length * 0.7 ? 'Great job! 👍' : 
                       'Keep practicing! 💪'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFinished(false);
                      setCurrentQuestion(0);
                      setScore(0);
                      setSelectedAnswer("");
                      setShowConfetti(false); // New: Stop confetti on restart
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    aria-label="Take Quiz Again Button" // New: Accessibility
                  >
                    🔄 Take Quiz Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Knowledge Check</h3>
                    <p className="text-gray-600">Test your understanding of the document</p>
                  </div>
                  
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">Question {currentQuestion + 1} of {quiz.length}</span>
                      <span className="font-medium">{Math.round(((currentQuestion + 1) / quiz.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-md"
                        style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 border border-gray-200 md:p-6"> {/* New: Responsive padding */}
                    <h4 className="text-xl font-semibold mb-6 text-gray-800" aria-label={`Question: ${quiz[currentQuestion].question}`}>{quiz[currentQuestion].question}</h4>
                    <div className="grid gap-3 md:grid-cols-1"> {/* New: Stack on mobile */}
                      {quiz[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectedOption(option)}
                          disabled={showFeedback} // New: Disable during feedback
                          className={`p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            showFeedback 
                              ? (selectedAnswer === option 
                                  ? (isCorrect ? 'border-green-500 bg-green-50 text-green-700 shadow-md' : 'border-red-500 bg-red-50 text-red-700 shadow-md')
                                  : option === quiz[currentQuestion].answer 
                                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md' // Show correct one
                                    : 'border-gray-200 text-gray-700'
                                )
                              : selectedAnswer === option 
                                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md transform scale-105' 
                                : 'border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                          }`}
                          role="radio" // New: Accessibility for radio-like selection
                          aria-checked={selectedAnswer === option}
                          aria-label={`Option ${index + 1}: ${option}`} // New: Accessibility
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {showFeedback && (
                      <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium text-center">
                        {isCorrect ? "Yay! That's right! 🌟" : `Nope! The correct answer is: "${quiz[currentQuestion].answer}"`}
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="text-center">
                    <button 
                      onClick={handlenext}
                      disabled={!selectedAnswer || showFeedback}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      aria-label="Next Question Button" // New: Accessibility
                    >
                      {currentQuestion + 1 < quiz.length ? 'Next Question →' : 'Finish Quiz 🎯'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Loading Overlay */}
      {(loadingSummary || loadingQuiz) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl border border-purple-200 max-w-md mx-4">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI is Processing</h3>
            <p className="text-gray-600 mb-4">Analyzing your document with advanced AI...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicUpload;

