import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { RecipeFactory } from './recipe.js';
import { NutritionFactory } from './nutrition.js';

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Nutrition = NutritionFactory(sequelize);

User.hasMany(Recipe, {
    foreignKey: 'userID',
    as: 'userRecipes',
    onDelete: 'CASCADE',
});

Recipe.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user',
});

Recipe.hasOne(Nutrition, {
    foreignKey: 'recipeID',
    as: 'nutrition',
    onDelete: 'CASCADE',
});

Nutrition.belongsTo(Recipe, {
    foreignKey: 'recipeID',
    as: 'userRecipes',
});

export { User, Recipe };
