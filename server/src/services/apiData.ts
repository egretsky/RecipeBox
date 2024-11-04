import { RecipeModel } from '../models/recipeInterface.js';
import { RecipeStep } from '../models/recipeInterface.js';

const apiKey = process.env.RECIPE_API_KEY;
const baseUrl = 'https://api.spoonacular.com/recipes/';
const recipeNum = 3; // Number of recipes to return

const getRecipesByIngredients = async (ingredients: string) => {
    const recipesData = await recipeDataByIngre(ingredients);
    const recipeList : RecipeModel[] = [];
    for (const recipe of recipesData) {
        const { id, title, image } = recipe;
        const infoData = await recipeDataByID(id);
        const { cookingMinutes, preparationMinutes, extendedIngredients } = infoData;
        const recipeIngredients = extendedIngredients.map((ingredient: any) => ingredient.original);
        const stepsData = await recipeStepsByID(id);
        const instructions = getRecipeSteps(stepsData);
        const newRecipe = {
            id,
            title,
            ingredients: recipeIngredients,
            instructions,
            cookingTime: cookingMinutes,
            preparationTime: preparationMinutes,
            imageUrl: image
        };
        recipeList.push(newRecipe);
    }
    return recipeList;
}

const getRecipeSteps = (recipeData: any) => {
    try {
        // Return an array of string instructions
        const instructions = recipeData[0].steps.map((step: RecipeStep) => step.step);
        return instructions;
    } catch (error) {
        console.error('Error parsing recipe data:', error);
        return [];
    }
}

const recipeDataByIngre = async (ingredients: string) => {
    try {
        const response = await fetch (`${baseUrl}findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=${recipeNum}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching recipes by ingredients: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

const recipeDataByID = async (id: number) => {
    try {
        const response = await fetch (`${baseUrl}${id}/information?apiKey=${apiKey}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching recipes by ingredients: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

const recipeStepsByID = async (id: number) => {
    try {
        const response = await fetch (`${baseUrl}${id}/analyzedInstructions?apiKey=${apiKey}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching recipes by ingredients: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

export { getRecipesByIngredients };