/* eslint-disable no-unused-vars */
import React from "react";
import {  FaHome, FaBrain } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 " >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section Brand */}
          <div className="flex items-center flex-shrink-0 space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
              <FaBrain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text">
              ViewSearch
            </span>
          </div>
          {/* Right Section - Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-2 transition-colors rounded-lg hover:bg-white/10">
              <FaHome className="w-6 h-6 text-white" />
            </button>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center space-x-2">
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
