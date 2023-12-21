import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/globalContext';

const useRecipeHistory = () => {
  const { state, updateState } = useContext(GlobalContext);
  const { recipeHistory = [] } = state;
  const history = useHistory();

  const addToRecipeHistory = useCallback(
    (recipeId) => {
      const newHistory = [...recipeHistory, recipeId];
      updateState({
        recipeHistory: newHistory,
      });
    },
    [recipeHistory, updateState]
  );

  const navigateToRecipe = useCallback(
    (recipeId) => {
      // Use react-router-dom's useHistory to navigate to the recipe
      history.push(`/recipe/${recipeId}`);
    },
    [history]
  );

  return {
    recipeHistory,
    addToRecipeHistory,
    navigateToRecipe,
  };
};

export default useRecipeHistory;
