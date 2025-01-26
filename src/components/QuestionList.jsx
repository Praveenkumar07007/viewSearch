import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const QuestionsList = ({ query, page, setPage }) => {
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://api.example.com/questions`, // Replace with your API
        {
          params: { query, page },
        }
      );
      setQuestions(response.data.questions);
      setTotalPages(response.data.totalPages);
    };

    fetchQuestions();
  }, [query, page]);

  return (
    <div>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{q.title}</h2>
            <p className="text-gray-500">Type: {q.type}</p>
          </li>
        ))}
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
