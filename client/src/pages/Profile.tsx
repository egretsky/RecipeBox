import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SpoonacularRecipe } from "../interfaces/recipe";  // Import the interface for Recipe
import auth from '../utils/auth';
import RecipeCard from '../components/RecipeCard';
import { saveRecipe } from '../api/recipeAPI';

const Profile: React.FC = () => {
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);  // State to store the list of recipes
  const [_currentRecipe, setCurrentRecipe] = useState<SpoonacularRecipe>();

  const token = auth.getToken();

  useEffect(() => {
    // Fetch the user's recipes when the component mounts
    axios.get('/api/recipes/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('Data:', response.data);
        setRecipes(response.data);  // Set the fetched data to the recipes state
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [token]);  // Add token as dependency to refetch if token changes

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
    <div>
      <h1>User Recipes</h1>
      {recipes.length > 0 ? (
        <div className='recipe-list'>
          {recipes.map((recipe) => (
            <RecipeCard recipe = {recipe} onSave={onSave} selectRecipe={selectRecipe} isProfile={true}/> // Render each recipe's title
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Profile;
