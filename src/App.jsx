import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import QuestionsList from "./components/QuestionList.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-center">QueryView</h1>
      <SearchBar setQuery={setQuery} />
      <QuestionsList query={query} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
