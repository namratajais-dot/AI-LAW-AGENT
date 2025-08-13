import React from "react";
import { Link } from "react-router-dom"; // ⬅️ import Link

function Home() {
    return (
    <div className="relative flex h-screen  text-gray-800 ">
      {/* Left Image Panel */}
      <div className="w-1/6 h-full border-r-2 border-gray-200 opacity-90">
        <img
          src={`${import.meta.env.BASE_URL}Themis.jpg`}
          alt="Lady Justice"
          className="w-full   border-r-8 border-blue-900 h-full object-cover object-center"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col opacity-90">
        {/* Top Swirl Background */}
        <div className="border-b-8  border-blue-900">
          <img
            src={`${import.meta.env.BASE_URL}Swirl.jpg`}
            alt=""
            className="w-full  aspect-[25/2] inset-x-0 top-0 object-center object-cover filter grayscale"
          />
        </div>
        

        {/* Main Centered Content */}
        <div className="flex-1 border-r-8 border-y-orange-500 border-blue-900 flex items-center justify-center">
          <div className=" text-center">
            {/* Heading */}
            <h1 className="text-5xl md:text-[6rem]  font-bold  tracking-wide uppercase mb-7 text-blue-900">
              AI LAW AGENT
            </h1>
            {/* Subheading */}
            <p className="text-lg md:text-2xl font-semibold mb-3 text-gray-700 tracking-normal">
              Free AI Legal Help In Your Language
            </p>
            {/* Tagline */}
            <p className="text-base md:text-lg text-gray-500 mb-8 tracking-wide">
              24/7 legal guidance for everyone
            </p>

              {/* Start Chat Button */}
            <Link to="/Chat">
            <button className="border-6 w-full py-3 px-[5rem] border-blue-900 text-blue-900 font-semibold text-lg md:text-xl rounded-full hover:bg-blue-900 hover:text-white transition">
              Start Chat
            </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full border-t-8 border-blue-900 bg-gray-400  text-xs md:text-sm text-gray-900 text-center py-4">
          <p>©2025 AI AGENT || All Rights Reserved</p>
          <p>
            This App Is For Information Purpose Only And Not A Substitute For
            Legal Advice
          </p>
        </footer>
      </div>
    </div>
  );
}
export default Home;