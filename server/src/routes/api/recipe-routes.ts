import express from 'express';
import type { Request, Response } from 'express';
import { getRecipesByIngredients } from '../../services/apiData.js';

const router = express.Router();

router.get('/getRecipes', async (req: Request, res: Response) => {
    try {
        const { ingredients } = req.body;
        const parsedData = await getRecipesByIngredients(ingredients);
        console.log('Parsed Data:', parsedData);
        res.json(parsedData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  export { router as recipeRouter };