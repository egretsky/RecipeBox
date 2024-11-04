import express from 'express';
import type { Request, Response } from 'express';
import { getRecipesByIngredients } from '../../services/apiData.js';
// import { authenticateToken } from '../../middleware/auth.js';
// import { User } from '../../models/user.js';

const router = express.Router();

router.get

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

// router.post('/recipes', authenticateToken, async (req: Request, res: Response) => {
//   const username = req.user?.username;
//   const { recipe } = req.body;
//     try {
//       const user = await User.findOne({ where: { username } });
      
//       console.log('Parsed Data:', parsedData);
//       res.json(parsedData);
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
// });

export { router as recipeRouter };