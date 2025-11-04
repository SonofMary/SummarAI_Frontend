import React, { useState } from "react";
import { Link } from "react-router-dom";

export function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center w-full px-8 py-4">
        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-semibold text-[#6C61EE]">
            SummarAI
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link to="/" className="hover:text-[#6C61EE] transition">Home</Link>
          <Link to="/about" className="hover:text-[#6C61EE] transition">About</Link>
          <Link to="/upload" className="hover:text-[#6C61EE] transition">Summary</Link>
          <Link to="/quiz" className="hover:text-[#6C61EE] transition">Quiz</Link>
        </nav>

        {/* Get Started Button (Desktop) */}
        <div className="hidden md:block">
          <Link to="/signin">
            <button className="px-4 py-2 bg-[#6C61EE] text-white rounded-md hover:bg-[#7a6ef5] transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white shadow-inner">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/upload" onClick={() => setIsOpen(false)}>Summary</Link>
          <Link to="/quiz" onClick={() => setIsOpen(false)}>Quiz</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            <button className="px-4 py-2 bg-[#6C61EE] text-white rounded-md hover:bg-[#7a6ef5] transition">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
