export interface RecipeModel {
    id: number; // Unique identifier for the recipe
    spoonacularID: number; // Unique identifier from the Spoonacular API
    title: string; // Title of the recipe
    ingredients: string[]; // List of ingredients required for the recipe
    instructions: string[]; // Step-by-step instructions for preparing the recipe
    cookingTime: number; // Cooking time in minutes
    preparationTime: number; // Preparation time in minutes
    imageUrl?: string; // Optional URL for an image of the recipe
    userID?: number; // Foreign key to associate the recipe with a user
    calories?: number;
    fat?: number;
    protein?: number;
    carbohydrates?: number;
    sugar?: number;
    sodium?: number;
}

export interface RecipeStep {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
    length?: {
    number: number;
    unit: string;
  };
}

interface Temperature {
    number: number;
    unit: string;
}
  
// Define the Equipment type
interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
    temperature?: Temperature; // Optional property, as not all equipment may have it
}

// Define the Ingredient type
interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}