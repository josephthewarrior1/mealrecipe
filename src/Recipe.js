import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients, instructions, onClick }) => {
  return (
    <div className={style.recipe} onClick={onClick}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <p>Instructions: {instructions}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
