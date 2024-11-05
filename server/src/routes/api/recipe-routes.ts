import express from 'express';
import type { Request, Response } from 'express';
import { getRecipesByIngredients } from '../../services/apiData.js';
import { authenticateToken } from '../../middleware/auth.js';
import { User } from '../../models/user.js';
import { Recipe } from '../../models/recipe.js';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const username = req.user?.username;
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRecipes = await Recipe.findAll({
      where: { userID: user.id }, // Use the user's ID to filter recipes
    });

    return res.json(userRecipes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/searchRecipes', async (req: Request, res: Response) => {
    try {
        const { ingredients } = req.body;
        const parsedData = await getRecipesByIngredients(ingredients);
        console.log('Parsed Data:', parsedData);
        res.json(parsedData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const username = req.user?.username;
  const { recipe } = req.body;

  try {
    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(recipe);
    // Add the recipe to the user's recipes
    await Recipe.create({ ...recipe, userID: userData.id });

    return res.json(userData);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const username = req.user?.username;
  const { id } = req.params;

  try {
    // Correct placement of the include option
    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attempt to delete the recipe
    const deletedCount = await Recipe.destroy({
      where: {
        id,
        userID: userData.id, // Ensure only recipes associated with the user are deleted
      },
    });

    // Check if the recipe was found and deleted
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Recipe not found or not associated with this user' });
    }

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});


export { router as recipeRouter };