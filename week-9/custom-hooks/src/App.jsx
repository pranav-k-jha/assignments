import React, { useEffect, useState } from "react";


const useDebounce = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
  }, [value]);
  return debouncedValue;
};

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return (
    <>
      <h2>Debounced Value is {debouncedValue}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
    </>
  );
};

export default SearchBar;
