import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
// import { Recipe } from '../../models/recipe.js'; // Import the Recipe interface
import { recipeDataByIngre } from '../../services/apiData.js';

const router = express.Router();
// const apiKey = process.env.SPOONACULAR_API_KEY;
// const baseUrl = 'https://api.spoonacular.com/recipes/';

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getRecipes', async (req: Request, res: Response) => {
    try {
        
        const { ingredients } = req.body;

        const parsedData = await recipeDataByIngre(ingredients);

        // const recipes = parsedData.map((recipe: Recipe) => {
        //     const { id, title, image, usedIngredients, missedIngredients } = recipe;
        //     const ingredients = usedIngredients.concat(missedIngredients).map((ingredient: any) => ingredient.name);
        //     return { id, title, image, ingredients };
        // });

        // const id = parsedData[0].id;

        // const stepData = `${baseUrl}641445/analyzedInstructions?apiKey=b8033d5918b94c42b98a52654a7a699b`

        // res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  export { router as recipeRouter };