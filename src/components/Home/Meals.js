import React, { useEffect, useState } from 'react';
import '../../App.css';
import Recipe from './Recipe';
import useSearchHistory from '../../hooks/useSearchHistory'; // Import the useSearchHistory hook
import { useNavigate } from 'react-router-dom';

const Meals = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const { searchHistory, addToSearchHistory, clearSearchHistory } = useSearchHistory(); // Use the useSearchHistory hook
  const navigate = useNavigate();

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      // Extract the relevant details from the API response
      const meals = data.meals || [];
      const formattedRecipes = meals.map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        ingredients: extractIngredients(meal),
        instructions: meal.strInstructions,
      }));

      setRecipes(formattedRecipes);

      // Add the current query to the search history
      addToSearchHistory(query);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const extractIngredients = (meal) => {
    // Extract and format ingredients from the meal object
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleHistoryItemClick = (clickedQuery) => {
    // Set the clicked query as the current query
    setQuery(clickedQuery);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Search meal by name"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div>
        {/* Display search history */}
        <h2>Search History</h2>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleHistoryItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
        <button onClick={clearSearchHistory}>Clear History</button>
      </div>
      <div className="recipes">
        {recipes &&
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
            />
          ))}
      </div>
    </div>
  );
};

export default Meals;
