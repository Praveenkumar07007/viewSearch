import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const QuestionsList = ({ query, page, setPage }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const questionsPerPage = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://quizapi.io/api/v1/questions", {
          headers: {
            "X-Api-Key": "bBHk3Aa3nF47s20RkOvxDTPFdO5txuPLyPgR2IQQ", // Your API Key
          },
          params: {
            limit: questionsPerPage,
            page,
          },
        });

        setQuestions(response.data);
        const totalQuestions = 100;
        setTotalPages(Math.ceil(totalQuestions / questionsPerPage));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page]);

  useEffect(() => {
    const filtered = questions.filter((q) =>
      q.question.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [query, questions]);

  return (
    <div>
      <ul className="space-y-4">
        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) : filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <li key={q.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{q.question}</h2>
              <ul className="mt-2">
                {Object.entries(q.answers)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <li key={key} className="text-gray-700">
                      {key.replace("answer_", "").toUpperCase()}: {value}
                    </li>
                  ))}
              </ul>
            </li>
          ))
        ) : (
          <p className="text-center">No questions found.</p>
        )}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default QuestionsList;
