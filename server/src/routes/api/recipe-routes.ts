import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();
const apiKey = process.env.SPOONACULAR_API_KEY;
const getByIngrUrl = 'https://api.spoonacular.com/recipes/findByIngredients';
// const getByIDUrl = 'https://api.spoonacular.com/recipes/';

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


router.get('/ingredient', async (req: Request, res: Response) => {
    try {
        const recipeNum = 3; // Number of recipes to return
        const { ingredient } = req.body;
        const data = `${getByIngrUrl}?apiKey=${apiKey}&ingredients=${ingredient}&number=${recipeNum}`;
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  export { router as recipeRouter };