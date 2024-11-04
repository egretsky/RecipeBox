import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { RecipeFactory } from './recipe.js';

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);

User.hasMany(Recipe, {
    foreignKey: 'userID',
    as: 'userRecipes',
    onDelete: 'CASCADE',
});

Recipe.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user',
});

export { User, Recipe };
