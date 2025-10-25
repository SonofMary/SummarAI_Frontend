import React from "react";
import heroImage from "../src/undraw_google-docs_khfo.svg";
import heroImage2 from "./businessman-2735574.png";
import { AiFillThunderbolt, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineThunderbolt, AiOutlineTrophy } from "react-icons/ai";
import { CiChat1, CiPower } from "react-icons/ci";

function Hero() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10  bg-white">
        {/* LEFT SIDE — TEXT */}
        <aside className="flex flex-col gap-6 w-full md:w-3/5 text-center md:text-left">
          <p className="text-4xl md:text-6xl  leading-tight text-gray-900">
            Turn PDFs into Smart Summaries and Quizzes
          </p>
          <p className="text-lg md:text-2xl text-gray-700">
            Upload your PDFs and let AI generate clear summaries and practice
            questions instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <button className="bg-[#6C61EE] text-white py-3 px-8 rounded-md hover:bg-[#5a54e0] transition">
              Upload PDF
            </button>
            <button className="bg-white border-2 border-[#6C61EE] text-[#6C61EE] py-3 px-8 rounded-md hover:bg-[#f2f1ff] transition">
              Try Demo
            </button>
          </div>
        </aside>

        {/* RIGHT SIDE — SVG */}
        <aside className="w-full md:w-2/5 flex justify-center mt-10 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 350"
            xmlSpace="preserve"
            className="w-64 md:w-80 h-auto"
          >
            <g fill="#6C61EE">
              <path d="m314.761 107.641-18.857-10.289V53.596a5.821 5.821 0 0 0-5.044-5.769l-115.078-15.58c-.034-.007-.068 0-.106-.005-.182-.021-.369-.02-.557-.026-.113-.001-.225-.01-.336-.008-.095.004-.186.004-.278.008-.165.016-.33.059-.494.087-.216.038-.437.067-.645.128-.122.036-.237.093-.358.138-.243.087-.488.18-.716.301-.025.013-.058.02-.083.034L35.234 107.641a5.831 5.831 0 0 0-3.034 5.113v199.215a5.83 5.83 0 0 0 2.848 5.008 5.832 5.832 0 0 0 2.975.814 5.82 5.82 0 0 0 2.791-.71L175 243.866l134.184 73.215a5.842 5.842 0 0 0 5.767-.104 5.834 5.834 0 0 0 2.851-5.008V112.755a5.834 5.834 0 0 0-3.041-5.114zM169.176 233.776 43.847 302.158V116.212L169.176 47.83v185.946zM284.255 58.683v32.314L205.494 48.02l78.761 10.663zm21.896 243.475-125.327-68.382V47.828l125.327 68.384v185.946z" />
              <path d="m129.69 210.013-59.153 32.275a5.825 5.825 0 0 0 2.8 10.936c.938 0 1.896-.228 2.779-.711l59.153-32.274a5.826 5.826 0 0 0 2.319-7.903 5.827 5.827 0 0 0-7.898-2.323zM83.117 191.613c.941 0 1.896-.227 2.782-.71l39.589-21.6a5.83 5.83 0 0 0 2.322-7.903 5.83 5.83 0 0 0-7.903-2.323l-39.589 21.6a5.825 5.825 0 0 0 2.799 10.936zM65.671 144.862c.941 0 1.897-.227 2.783-.711l74.475-40.635a5.828 5.828 0 0 0 2.323-7.902 5.827 5.827 0 0 0-7.901-2.324l-74.475 40.636a5.825 5.825 0 0 0-2.324 7.902 5.831 5.831 0 0 0 5.119 3.034zM279.457 242.289l-59.146-32.275a5.833 5.833 0 0 0-7.903 2.323 5.827 5.827 0 0 0 2.324 7.903l59.144 32.274a5.824 5.824 0 1 0 5.581-10.225zM264.097 190.903a5.82 5.82 0 0 0 7.901-2.325c1.544-2.821.501-6.358-2.325-7.901l-39.583-21.6a5.83 5.83 0 0 0-7.901 2.323 5.827 5.827 0 0 0 2.323 7.903l39.585 21.6zM207.068 103.516l74.476 40.635a5.827 5.827 0 0 0 7.9-2.323 5.826 5.826 0 0 0-2.322-7.902L212.649 93.29c-2.822-1.54-6.359-.494-7.902 2.324a5.827 5.827 0 0 0 2.321 7.902z" />
            </g>
          </svg>
        </aside>
      </div>

      <>
        <div className="grid sm:grid-cols-12 p-8 items-center bg-white">
          <div className="sm:col-span-6 flex flex-col gap-4">
            <p></p>
            <h3 className="sm:text-8xl text-4xl mb-2 ">
              Read <span className="sm:text-4xl italic">Less.</span>
              <br />
              <span className="sm:text-4xl italic">Learn </span>
              <span>More.</span>
            </h3>
            <p className="mb-4 sm:text-xl text-[#3f3f3f]">
              Why spend hours reading when AI can summarize it in seconds?
              Upload any document, get instant summaries, take smart quizzes,
              and chat with your docs like they're your study buddy.
            </p>
            <button className="bg-[#363636] text-white  sm:text-xl rounded-sm p-2 w-fit flex items-center justify-center gap-1 hover:bg-slate-500">
              Get Started for free <AiOutlineArrowRight className="mt-1" />
            </button>

            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              No Credit Card
            </p>
            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>{" "}
              Free Forever
            </p>
            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Works with Pdf and DOCX
            </p>
          </div>
          <div className="sm:col-span-6 hidden sm:block">
            <img src={heroImage} alt="" />
          </div>
        </div>

        <div className=" p-10 bg-white mt-5 flex flex-col gap-8">
          <div className="flex items-center justify-center gap-6 flex-col">
            <h3 className="text-2xl sm:text-5xl">
              So Simple, Even Your Goldfish Could Do It
            </h3>
            <p className="text-xl sm:text-3xl">
              Three steps to document enlightenment. No PhD required.
            </p>
          </div>
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 border-2 p-4 flex flex-col gap-2">
              <div className="sm:text-6xl text-blue-300">01</div>
              <p>Drop Your Document</p>
              <p>PDF or DOCX? We got you. Just drag, drop, and chill.</p>
            </div>
            <div className="sm:col-span-4 border-2 p-4 flex flex-col gap-2 ">
              <div className="sm:text-6xl text-purple-300">02</div>
              <p>AI Works Its Magic</p>
              <p>Our AI reads faster than you had your morning coffee. Summaries in seconds.</p>
            </div>
           <div className="sm:col-span-4  border-2 p-4 flex flex-col gap-2">
              <div className="sm:text-6xl text-green-500">03</div>
              <p>Learn Smarter</p>
              <p>Read summaries, ace quizzes, or chat away. Your document, your way.</p>
            </div>
          </div>
        </div>

        {/* NEXT SECTION IN THE HERO */}
        <div className="grid sm:grid-cols-12 p-8 items-center">
          <div className="sm:col-span-6 hidden sm:block">
            <img src={heroImage2} alt="" />
          </div>
          <div className="sm:col-span-6  flex flex-col gap-4">
            <p className="text-5xl">Everything You Need to Dominate Your Docs</p>
            <p className="text-2xl">Stop drowning in PDFs. Start swimming in knowledge.</p>
            
          </div>
        </div>
         <div className="grid sm:grid-cols-12 gap-4 p-12">
            <div className="sm:col-span-4 border-2 p-4 flex flex-col gap-2">
              <div className="text-3xl  text-blue-300"><AiOutlineThunderbolt /></div>
              <p>AI powered Summaries </p>
              <p>Upload your docs and let AI do the heavy lifting. Get instant, accurate summaries that actually make sense.</p>
            </div>
            <div className="sm:col-span-4 border-2 p-4 flex flex-col gap-2 ">
              <div className="text-3xl  text-purple-300"><AiOutlineTrophy /></div>
              <p>Smart Quizzes </p>
              <p>Test yourself with auto-generated quizzes. Because reading is great, but remembering? That's the real flex.</p>
            </div>
           <div className="sm:col-span-4  border-2 p-4 flex flex-col gap-2">
              <div className="text-3xl text-green-500"><CiChat1 /></div>
              <p>Chat with Your Docs</p>
              <p>Ask questions, get answers. Like having a conversation with your PDF, minus the awkward silence.</p>
            </div>
          </div>
          <div>
            <div className="bg-black flex flex-col gap-4 mx-auto w-8/12 text-white items-center p-8 rounded-xl">
              <p className="text-4xl text-center">Ready to Actually Understand Your Documents?</p>
              <p className="text-xl text-center">Join thousands of smart people who stopped pretending they read everything and started using AI instead.</p>
              <button className="bg-white text-black flex gap-1 items-center p-2 rounded-md">Start Summarizing Now <AiOutlineArrowRight/></button>
            </div>
          </div>
      </>
    </>
  );
}

export default Hero;
