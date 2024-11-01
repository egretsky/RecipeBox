export interface Recipe {
    id: number; // Unique identifier for the recipe
    title: string; // Title of the recipe
    ingredients: string[]; // List of ingredients required for the recipe
    instructions: string[]; // Step-by-step instructions for preparing the recipe
    cookingTime: number; // Cooking time in minutes
    imageUrl?: string; // Optional URL for an image of the recipe
}