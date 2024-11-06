import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe } from "../interfaces/recipe";  // Import the interface for Recipe
import RecipeCard from '../components/RecipeCard';

const Profile: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);  // State to store the list of recipes
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: 0,
    title: '',
    ingredients: [],
    instructions: [],
    cookingTime: 0,
    preparationTime: 0,
    imageUrl: '',
  });  // State to store new recipe details
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // State to store the selected recipe

  useEffect(() => {
    // Fetch saved recipes from the server when the component mounts
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>('/api/recipes');  // Make a GET request to fetch recipes
        setRecipes(response.data);  // Update the state with the fetched recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);  // Log an error if the request fails
      }
    };
    fetchRecipes();  // Call the fetchRecipes function
  }, []);

  // Handle changes in the input fields for adding a new recipe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: name === 'ingredients' || name === 'instructions' ? value.split(',') : value,
    }));  // Update the corresponding state field with the new value
  };

  // Handle form submission for adding a new recipe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Recipe>('/api/recipes', newRecipe);  // Make a POST request to add a new recipe
      const newRecipeId = response.data.id; // Get the ID of the newly created recipe
      setRecipes((prevState) => [...prevState, response.data]);  // Add the new recipe to the state

      // Automatically save the newly created recipe to the user's profile 
      await axios.post('/api/save-recipe', { recipeId: newRecipeId });

      // Reset the form fields after successful submission
      setNewRecipe({
        id: 0,
        title: '',
        ingredients: [],
        instructions: [],
        cookingTime: 0,
        preparationTime: 0,
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error adding recipe:', error);  // Log an error if the request fails
    }
  };

    // Handle recipe title click to show details
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);  // Set the selected recipe
  };

  // Handle saving a recipe to the user's profile
  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      await axios.post('/api/save-recipe', { recipeId: recipe.id });  // Make a POST request to save the recipe to the user's profile
      // Optionally, you can update the UI to reflect that the recipe has been saved
    } catch (error) {
      console.error('Error saving recipe:', error);  // Log an error if the request fails
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
        <h2>Saved Recipes</h2>
      <ul>
        {/* Render each saved recipe as a clickable title */}
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleRecipeClick(recipe)} className="recipe-bar">
            <h3>{recipe.title}</h3>
          </li>
        ))}
      </ul>

      {/* Render RecipeCard component if a recipe is selected */}
      {selectedRecipe && <RecipeCard recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} onSave={() => handleSaveRecipe(selectedRecipe)} />}

      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            name="ingredients"
            value={newRecipe.ingredients.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions (comma separated)</label>
          <textarea
            name="instructions"
            value={newRecipe.instructions.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={newRecipe.cookingTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Preparation Time (minutes)</label>
          <input
            type="number"
            name="preparationTime"
            value={newRecipe.preparationTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={newRecipe.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default Profile;