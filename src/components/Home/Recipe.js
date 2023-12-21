// src/components/Home/Recipe.js
import React from 'react';

const Recipe = ({ title, image, ingredients, instructions }) => {
  return (
    <div className="recipe">
      <h3>{title}</h3>
      <img src={image} alt={title} />
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{instructions}</p>
    </div>
  );
};

export default Recipe;
