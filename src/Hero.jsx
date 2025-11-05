import React from "react";
import heroImage from "../src/premium_vector-1720824711757-a5364459f231-removebg-preview.png";
import heroImage2 from "./businessman-2735574.png";
import { AiFillThunderbolt, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineThunderbolt, AiOutlineTrophy } from "react-icons/ai";
import { CiChat1, CiPower } from "react-icons/ci";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-8 md:py-10 bg-white">
        {/* LEFT SIDE — TEXT */}
        <aside className="flex flex-col gap-4 md:gap-6 w-full md:w-3/5 text-center md:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
            Turn PDFs into Smart Summaries and Quizzes
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700">
            Upload your PDFs and let AI generate clear summaries and practice
            questions instantly.
          </p>
         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mt-3 sm:mt-4">
  <Link to={"/upload"} className="flex">
    <button className="bg-[#6C61EE] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-md hover:bg-[#5a54e0] text-sm sm:text-base transition-transform hover:scale-105 w-full">
      Upload PDF
    </button>
  </Link>
  
  <Link to={"/upload"} className="flex">
    <button className="bg-white border-2 border-[#6C61EE] text-[#6C61EE] py-2 sm:py-3 px-6 sm:px-8 rounded-md hover:bg-[#f2f1ff] text-sm sm:text-base transition-transform hover:scale-105 w-full">
      Try Now
    </button>
  </Link>
</div>
        </aside>

        {/* RIGHT SIDE — SVG */}
        <aside className="w-full md:w-2/5 flex justify-center mt-8 sm:mt-10 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 350"
            xmlSpace="preserve"
            className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto"
          >
            <g fill="#6C61EE">
              <path d="m314.761 107.641-18.857-10.289V53.596a5.821 5.821 0 0 0-5.044-5.769l-115.078-15.58c-.034-.007-.068 0-.106-.005-.182-.021-.369-.02-.557-.026-.113-.001-.225-.01-.336-.008-.095.004-.186.004-.278.008-.165.016-.33.059-.494.087-.216.038-.437.067-.645.128-.122.036-.237.093-.358.138-.243.087-.488.18-.716.301-.025.013-.058.02-.083.034L35.234 107.641a5.831 5.831 0 0 0-3.034 5.113v199.215a5.83 5.83 0 0 0 2.848 5.008 5.832 5.832 0 0 0 2.975.814 5.82 5.82 0 0 0 2.791-.71L175 243.866l134.184 73.215a5.842 5.842 0 0 0 5.767-.104 5.834 5.834 0 0 0 2.851-5.008V112.755a5.834 5.834 0 0 0-3.041-5.114zM169.176 233.776 43.847 302.158V116.212L169.176 47.83v185.946zM284.255 58.683v32.314L205.494 48.02l78.761 10.663zm21.896 243.475-125.327-68.382V47.828l125.327 68.384v185.946z" />
              <path d="m129.69 210.013-59.153 32.275a5.825 5.825 0 0 0 2.8 10.936c.938 0 1.896-.228 2.779-.711l59.153-32.274a5.826 5.826 0 0 0 2.319-7.903 5.827 5.827 0 0 0-7.898-2.323zM83.117 191.613c.941 0 1.896-.227 2.782-.71l39.589-21.6a5.83 5.83 0 0 0 2.322-7.903 5.83 5.83 0 0 0-7.903-2.323l-39.589 21.6a5.825 5.825 0 0 0 2.799 10.936zM65.671 144.862c.941 0 1.897-.227 2.783-.711l74.475-40.635a5.828 5.828 0 0 0 2.323-7.902 5.827 5.827 0 0 0-7.901-2.324l-74.475 40.636a5.825 5.825 0 0 0-2.324 7.902 5.831 5.831 0 0 0 5.119 3.034zM279.457 242.289l-59.146-32.275a5.833 5.833 0 0 0-7.903 2.323 5.827 5.827 0 0 0 2.324 7.903l59.144 32.274a5.824 5.824 0 1 0 5.581-10.225zM264.097 190.903a5.82 5.82 0 0 0 7.901-2.325c1.544-2.821.501-6.358-2.325-7.901l-39.583-21.6a5.83 5.83 0 0 0-7.901 2.323 5.827 5.827 0 0 0 2.323 7.903l39.585 21.6zM207.068 103.516l74.476 40.635a5.827 5.827 0 0 0 7.9-2.323 5.826 5.826 0 0 0-2.322-7.902L212.649 93.29c-2.822-1.54-6.359-.494-7.902 2.324a5.827 5.827 0 0 0 2.321 7.902z" />
            </g>
          </svg>
        </aside>
      </div>

      <>
        <div className="grid sm:grid-cols-12 p-6 sm:p-8 lg:p-12 items-center bg-white">
          <div className="sm:col-span-6 flex flex-col gap-3 sm:gap-4">
           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
  Read <span className="italic text-3xl sm:text-4xl">Less.</span>
  <br />
  <span className="italic text-3xl sm:text-4xl">Learn</span> More.
</h3>
            <p className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl text-[#3f3f3f]">
              Why spend hours reading when AI can summarize it in seconds?
              Upload any document, get instant summaries, take smart quizzes,
              and chat with your docs like they're your study buddy.
            </p>
            <Link to={"/upload"}>
            <button className="bg-[#363636] text-white text-sm sm:text-base md:text-xl rounded-sm p-1 sm:p-3 w-fit flex items-center justify-center gap-1 hover:bg-[#3676DF] transition-transform hover:scale-105" >
              Get Started for free <AiOutlineArrowRight className="mt-1" />
            </button>
            </Link>

            <div className="space-y-2 sm:space-y-3 mt-2 sm:mt-4">
              <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#3676DF"
                  className="size-5 sm:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                No Credit Card
              </p>
              <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#3676DF"
                  className="size-5 sm:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>{" "}
                Free Forever
              </p>
              <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#3676DF"
                  className="size-5 sm:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Works with Pdf and DOCX
              </p>
            </div>
          </div>
          <div className="sm:col-span-6 hidden sm:block">
            <img src={heroImage} alt="" loading="lazy" className="w-full" />
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10 bg-white mt-4 sm:mt-5 flex flex-col gap-6 sm:gap-8">
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-col">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
              So Simple, Even Your Goldfish Could Do It
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
              Three steps to document enlightenment. No PhD required.
            </p>
          </div>
          <div className="grid sm:grid-cols-12 gap-3 sm:gap-4 mt-2">
            <div className="sm:col-span-4 border-2 p-3 sm:p-4 py-4 sm:py-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-6xl text-blue-300">01</div>
              <p className="font-semibold text-sm sm:text-base md:text-lg">Drop Your Document</p>
              <p className="text-sm sm:text-base">PDF or DOCX? We got you. Just drag, drop, and chill.</p>
            </div>
            <div className="sm:col-span-4 border-2 p-3 sm:p-4 py-4 sm:py-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-6xl text-purple-300">02</div>
              <p className="font-semibold text-sm sm:text-base md:text-lg">AI Works Its Magic</p>
              <p className="text-sm sm:text-base">Our AI reads faster than you had your morning coffee. Summaries in seconds.</p>
            </div>
           <div className="sm:col-span-4 border-2 p-3 sm:p-4 py-4 sm:py-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl sm:text-5xl md:text-6xl text-green-500">03</div>
              <p className="font-semibold text-sm sm:text-base md:text-lg">Learn Smarter</p>
              <p className="text-sm sm:text-base">Read summaries, ace quizzes, or chat away. Your document, your way.</p>
            </div>
          </div>
        </div>

        {/* NEXT SECTION IN THE HERO */}
        <div className="grid sm:grid-cols-12 items-center p-6 sm:p-8 md:p-12">
          <div className="sm:col-span-6 hidden sm:block">
            <img src="https://plus.unsplash.com/premium_vector-1682301850017-0bb29cfd6580?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580" alt="" className="w-full" loading="lazy" />
          </div>
          <div className="sm:col-span-6 flex flex-col gap-3 sm:gap-4 p-4 sm:p-0">
            <p className="text-3xl sm:text-4xl md:text-5xl">Everything You Need to Dominate Your Docs</p>
            <p className="text-lg sm:text-xl md:text-2xl">Stop drowning in PDFs. Start swimming in knowledge.</p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-12 gap-3 sm:gap-4 p-6 sm:p-8 md:p-12">
          <div className="sm:col-span-4 border-2 p-3 sm:p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl sm:text-3xl text-blue-300"><AiOutlineThunderbolt /></div>
            <p className="font-semibold text-sm sm:text-base md:text-lg">AI powered Summaries</p>
            <p className="text-sm sm:text-base">Upload your docs and let AI do the heavy lifting. Get instant, accurate summaries that actually make sense.</p>
          </div>
          <div className="sm:col-span-4 border-2 p-3 sm:p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl sm:text-3xl text-purple-300"><AiOutlineTrophy /></div>
            <p className="font-semibold text-sm sm:text-base md:text-lg">Smart Quizzes</p>
            <p className="text-sm sm:text-base">Test yourself with auto-generated quizzes. Because reading is great, but remembering? That's the real flex.</p>
          </div>
          <div className="sm:col-span-4 border-2 p-3 sm:p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl sm:text-3xl text-green-500"><CiChat1 /></div>
            <p className="font-semibold text-sm sm:text-base md:text-lg">Chat with Your Docs</p>
            <p className="text-sm sm:text-base">Ask questions, get answers. Like having a conversation with your PDF, minus the awkward silence.</p>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 md:p-12">
          <div className="bg-[#1c1c1c] flex flex-col gap-3 sm:gap-4 mx-auto text-white items-center p-6 sm:p-8 rounded-xl max-w-full">
            <p className="text-2xl sm:text-3xl md:text-4xl text-center">Ready to Actually Understand Your Documents?</p>
            <p className="text-base sm:text-lg md:text-xl text-center">Join thousands of smart people who stopped pretending they read everything and started using AI instead.</p>
            <Link to={"/upload"}>
            <button className="bg-white text-black flex gap-1 items-center p-2 sm:p-3 rounded-md text-sm sm:text-base transition-transform hover:scale-105">Start Summarizing Now <AiOutlineArrowRight/></button>
            </Link>
          </div>
        </div>
      </>
    </>
  );
}

export default Hero;