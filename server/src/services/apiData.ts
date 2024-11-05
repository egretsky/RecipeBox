import { RecipeModel } from '../models/recipeInterface.js';
import { RecipeStep } from '../models/recipeInterface.js';

const apiKey = process.env.RECIPE_API_KEY;
const baseUrl = 'https://api.spoonacular.com/recipes/';
const recipeNum = 3; // Number of recipes to return

interface Nutrition {
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    sodium: number;
}

const getRecipesByIngredients = async (ingredients: string) => {
    try {
        const recipesData = await recipeDataByIngre(ingredients);
        // console.log(recipesData);
        const recipeList : RecipeModel[] = [];

        // Use Promise.all to fetch data in parallel
        const recipePromises = recipesData.map(async (recipe:any) => {
            const { id, title, image } = recipe;
            const infoData = await recipeDataByID(id);
            // console.log(infoData);
            const extractedNutrition: Nutrition = extractNutrition(infoData);
            const { calories, fat, protein, carbohydrates, sugar, sodium } = extractedNutrition;
            const { cookingMinutes, preparationMinutes, extendedIngredients } = infoData;
            const recipeIngredients = extendedIngredients.map((ingredient: any) => ingredient.original);
            const stepsData = await recipeStepsByID(id);
            const instructions = getRecipeSteps(stepsData);
            return {
                spoonacularID: id,
                title,
                ingredients: recipeIngredients,
                instructions,
                cookingTime: cookingMinutes,
                preparationTime: preparationMinutes,
                imageUrl: image,
                calories,
                fat,
                protein,
                carbohydrates,
                sugar,
                sodium
            };
        });

        const resolvedRecipes = await Promise.all(recipePromises);
        recipeList.push(...resolvedRecipes);
        return recipeList;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return []; // Return an empty list or handle the error as needed
    }
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
        const response = await fetch (`${baseUrl}${id}/information?includeNutrition=true&apiKey=${apiKey}`);
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
        console.log('Error fetching recipe steps: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

const extractNutrition = (recipeData: any) => {
    let calories, fat, protein, carbohydrates, sugar, sodium;

    for (const nutrition of recipeData.nutrition.nutrients) {
        if (nutrition.name === 'Calories') {
            calories = nutrition.amount;
        } else if (nutrition.name === 'Fat') {
            fat = nutrition.amount;
        } else if (nutrition.name === 'Protein') {
            protein = nutrition.amount;
        } else if (nutrition.name === 'Carbohydrates') {
            carbohydrates = nutrition.amount;
        } else if (nutrition.name === 'Sugar') {
            sugar = nutrition.amount;
        } else if (nutrition.name === 'Sodium') {
            sodium = nutrition.amount;
        }
    }
    
    return { calories, fat, protein, carbohydrates, sugar, sodium };
}
    
export { getRecipesByIngredients };