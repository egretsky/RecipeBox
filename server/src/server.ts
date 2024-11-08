const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import { Request, Response } from 'express';
import sequelize from './config/connection.js';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
// import { Recipe } from './models/recipe';
// import { UserRecipe } from './models/userRecipe'

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});


app.use(bodyParser.json());

// Sync the database and log a message on success
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Failed to sync database:', error);
});

// Endpoint to get all recipes
// app.get('/api/recipes', async (_req: Request, res: Response) => {
//   try {
//     const recipes = await Recipe.findAll();
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).send('Error fetching recipes');
//   }
// });

// Endpoint to add a new recipe
// app.post('/api/recipes', async (req: Request, res: Response) => {
//   try {
//     const newRecipe = await Recipe.create(req.body);
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     res.status(500).send('Error adding recipe');
//   }
// });

// Endpoint to save a recipe to the user's profile
// app.post('/api/save-recipe', async (req: Request, res: Response) => {
//   const { userId, recipeId } = req.body;
//   try {
//     await UserRecipe.create({ userId, recipeId });
//     res.status(201).send('Recipe saved to profile');
//   } catch (error) {
//     res.status(500).send('Error saving recipe');
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
