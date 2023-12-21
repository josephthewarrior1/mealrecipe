// src/hooks/useSearchHistory.js

import { useEffect, useState } from 'react';

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Retrieve search history from local storage on component mount
    const storedHistory = localStorage.getItem('recipeSearchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToSearchHistory = (query) => {
    // Check if the query already exists in the search history
    const index = searchHistory.indexOf(query);

    if (index !== -1) {
      // If the query exists, remove it
      const newHistory = [...searchHistory.slice(0, index), ...searchHistory.slice(index + 1)];
      setSearchHistory(newHistory);
    }

    // Add the new query to the search history
    setSearchHistory((prevHistory) => [query, ...prevHistory]);

    // Save the updated search history to local storage
    localStorage.setItem('recipeSearchHistory', JSON.stringify([query, ...searchHistory]));
  };

  const clearSearchHistory = () => {
    // Clear the search history
    setSearchHistory([]);
    localStorage.removeItem('recipeSearchHistory');
  };

  return { searchHistory, addToSearchHistory, clearSearchHistory };
};

export default useSearchHistory;
