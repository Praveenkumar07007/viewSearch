import React from "react";

const SearchBar = ({ setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search questions by title..."
      className="w-full p-2 border rounded focus:outline-none focus:ring-2"
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
