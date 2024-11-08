import { SpoonacularRecipe } from '../interfaces/recipe';
import auth from '../utils/auth';

const token = auth.getToken();
console.log(token);

const getRecipesByIngredients = async (ingredients: string[]) => {
  try {
    // Construct the query string from the ingredients array
    const queryString = ingredients.join(','); 
    console.log(`/api/recipes/searchRecipes?ingredients=${queryString}`);
    // Send a GET request with the query string
    const response = await fetch(`/api/recipes/searchRecipes?ingredients=${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data: SpoonacularRecipe[] = await response.json();
    return data;
  } catch (err) {
    console.log('Error fetching recipes by ingredients: ', err);
    return Promise.reject('Could not fetch recipes');
  }
};

const getUserRecipes = async () => {
  try {
    const response = await fetch('/api/recipes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const saveRecipe = async (recipe: SpoonacularRecipe) => {
  try {
    const response = await fetch('/api/recipes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ recipe })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error saving recipe: ', err);
    return Promise.reject('Could not save recipe');
  }
}

const deleteRecipe = async (id: number) => {
  try {
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error deleting recipe: ', err);
    return Promise.reject('Could not delete recipe');
  }
}

export { getRecipesByIngredients };
export { getUserRecipes };
export { saveRecipe };
export { deleteRecipe };