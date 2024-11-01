import { RecipeStep } from '../models/recipe';

const getRecipeSteps = (recipeData: string) => {
    try {
        const recipe = JSON.parse(recipeData);
        // Return an array of string instructions
        const instructions = recipe[0].steps.map((step: RecipeStep) => step.step);
        return instructions;
    } catch (error) {
        console.error('Error parsing recipe data:', error);
        return [];
    }
}

export default getRecipeSteps;
