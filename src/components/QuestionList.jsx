/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const QuestionsList = ({ query, page, setPage, resultsPerPage }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");

  const questionTypes = [
    { value: "all", label: "All Types" },
    { value: "MCQ", label: "Multiple Choice" },
    { value: "ANAGRAM", label: "Anagram" },
    { value: "TRUE_FALSE", label: "True/False" },
    { value: "BLANK", label: "Fill in the Blank" },
    { value: "SHORT_ANSWER", label: "Short Answer" },
    { value: "ESSAY", label: "Essay" },
    { value: "MATCHING", label: "Matching" },
    { value: "ORDERING", label: "Ordering" },
    { value: "NUMERIC", label: "Numeric" },
    { value: "HOTSPOT", label: "Hotspot" },
    { value: "DRAG_DROP", label: "Drag and Drop" },
    { value: "CLOZE", label: "Cloze" },
    { value: "TRUE_FALSE_JUSTIFICATION", label: "True/False with Justification" },
    { value: "MULTIPLE_RESPONSE", label: "Multiple Response" },
    { value: "EXTENDED_MATCHING", label: "Extended Matching" },
    { value: "SCENARIO", label: "Scenario" },
    { value: "CASE_STUDY", label: "Case Study" },
    { value: "SIMULATION", label: "Simulation" },
    { value: "PRACTICAL", label: "Practical" },
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://quizapi.io/api/v1/questions", {
          headers: {
            "X-Api-Key": "bBHk3Aa3nF47s20RkOvxDTPFdO5txuPLyPgR2IQQ",
          },
          params: {
            limit: resultsPerPage,
            page,
            category: selectedType !== "all" ? selectedType : undefined,
          },
        });

        setQuestions(response.data);
        const totalQuestions = 100;
        setTotalPages(Math.ceil(totalQuestions / resultsPerPage));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page, resultsPerPage, selectedType]);

  useEffect(() => {
    const filtered = questions.filter(q =>
      q.question.toLowerCase().includes(query.toLowerCase()) &&
      (selectedType === "all" || q.type === selectedType)
    );
    setFilteredQuestions(filtered);
  }, [query, questions, selectedType]);

  return (
    <div className="space-y-6">
      {/* Type Filter Dropdown */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {questionTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading questions...</p>
        </div>
      )}

      {/* Results */}
      {!loading && (
        <>
          {filteredQuestions.length > 0 ? (
            <div className="space-y-4">
              {filteredQuestions.map(q => (
                <div key={q.id} className="p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{q.question}</h3>
                      <span className="inline-block px-3 py-1 mt-2 text-sm text-blue-800 bg-blue-100 rounded-full">
                        {q.type || "General"}
                      </span>
                    </div>
                  </div>

                  {q.answers && (
                    <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2">
                      {Object.entries(q.answers)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className={`p-3 rounded-lg ${
                              q.correct_answers[`${key}_correct`] === "true"
                                ? "bg-green-100 border border-green-200"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <span className="font-medium text-gray-700">
                              {key.replace("answer_", "").toUpperCase()}:
                            </span>
                            <span className="ml-2 text-gray-600">{value}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-xl">
              <p className="text-gray-600">No questions found matching your criteria.</p>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default QuestionsList;
