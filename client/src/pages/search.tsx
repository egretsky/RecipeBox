import React, { useState } from 'react';
import { getRecipesByIngredients, saveRecipe } from '../api/recipeAPI';
import RecipeCard from '../components/RecipeCard';
import { SpoonacularRecipe } from '../interfaces/recipe';


const Search: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const [currentRecipe, setCurrentRecipe] = useState<SpoonacularRecipe>();
  console.log( currentRecipe);

  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    try {
      const newRecipes = await getRecipesByIngredients(ingredients);
      if (newRecipes.length === 0) {
        alert("No recipes found for the given ingredients.");
      } else {
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
        setCurrentRecipe(newRecipes[0]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const onSave = async(recipe: SpoonacularRecipe) => {
    console.log('Saving recipe:', JSON.stringify(recipe));
    await saveRecipe(recipe);
    alert('Recipe saved!');
  }

  const selectRecipe = (index: number) => {
    const localRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setCurrentRecipe(localRecipes[index]);
  }

  return (
    <div className='display-flex flex-column gap-40'>
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
          <button className="btn" onClick={addIngredient}>Add Ingredient</button>
        </div>
        <div className="ingredient-list">
          <p className='display-flex align-center m-0'>Ingredients:</p>
          {ingredients.map((ing, index) => (
            <span key={index} className="ingredient-tag align-center" onClick={() => removeIngredient(ing)}>
              {ing}
            </span>
          ))}
        </div>
        <button className="btn" onClick={searchRecipes}>Search Recipes</button>
      </div>
      <div className='display-flex justify-center'>
        {currentRecipe ? <RecipeCard recipe = {currentRecipe} onSave={onSave} selectRecipe={selectRecipe} isProfile={false}/> : <div>No recipe selected</div>}
      </div>
    </div>
  );
};

export default Search;


