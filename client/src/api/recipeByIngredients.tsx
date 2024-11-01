import { Recipe } from '../interfaces/recipe';

const getRecipesByIngredients = async (ingredients: string[]) => {
  try {
    const response = await fetch('/api/recipes/getRecipes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data: Recipe[] = await response.json();
    return data;
  } catch (err) {
    console.log('Error fetching recipes by ingredients: ', err);
    return Promise.reject('Could not fetch recipes');
  }
}

export { getRecipesByIngredients };