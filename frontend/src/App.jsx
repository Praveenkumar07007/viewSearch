/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBar from "./components/SearchBar.jsx";
import QuestionsList from "./components/QuestionList.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResultsPerPageChange = (e) => {
    setResultsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <Navbar />
      <div className="max-w-6xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
        <SearchBar setQuery={setQuery} />
        <div className="flex flex-col items-center justify-between gap-4 mt-8 md:flex-row">
          <div className="flex items-center space-x-4">
        </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 text-blue-600 transition-colors hover:text-blue-800"
          >
            {showSettings ? "Hide Settings" : "Display Settings"}
          </button>
        </div>


        {showSettings && (
          <div className="p-6 mt-6 space-y-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">Display Settings</h2>
            <select
              className="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        )}


        <div className="p-6 mt-8 rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-800">Search Tips</h3>
          <ul className="pl-5 mt-2 space-y-2 text-blue-700 list-disc">
            <li>Use specific keywords for better results</li>
            <li>Filter by question type to narrow down results</li>
            <li>Try different sorting options to find what you need</li>
          </ul>
        </div>
      </div>


      <div className="max-w-6xl p-6 mx-auto mt-8 bg-white shadow-lg rounded-xl">
        {loading ? (
          <div className="flex items-center justify-center mt-6">
            <AiOutlineLoading3Quarters className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mt-4 text-sm text-gray-600">
              Showing {((page - 1) * resultsPerPage) + 1}-{Math.min(page * resultsPerPage, 56)} of 56 results
            </div>
            <QuestionsList query={query} page={page} resultsPerPage={resultsPerPage} setPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
