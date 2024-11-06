import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import { getRecipesByIngredients } from '../api/recipeAPI'; 

const Search: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);


  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const searchRecipes = async () => {
    try {
      await getRecipesByIngredients(ingredients); 
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <h2>Find Recipes by Ingredients</h2>
        <div className="ingredient-input">
          <input
            type="text"
            placeholder="Enter an ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
          />
          <button onClick={addIngredient}>Add Ingredient</button>
        </div>
        <div className="ingredient-list">
          <p>Ingredients:</p>
          {ingredients.map((ing, index) => (
            <span key={index} className="ingredient-tag">
              {ing}
            </span>
          ))}
        </div>
        <button onClick={searchRecipes}>Search Recipes</button>
      </div>
    </div>
  );
};

export default Search;


