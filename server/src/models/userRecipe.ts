import { DataTypes, Sequelize, Model, Optional} from 'sequelize';

// Define the attributes for the UserRecipe model
interface UserRecipeAttributes {
  userId: number;
  recipeId: number;
}

// Optional attributes for creating UserRecipe instances
interface UserRecipeCreationAttributes extends Optional<UserRecipeAttributes, 'userId' | 'recipeId'> {}

// Define the UserRecipe model extending from Sequelize's Model class
export class UserRecipe extends Model<UserRecipeAttributes, UserRecipeCreationAttributes> implements UserRecipeAttributes {
  public userId!: number;
  public recipeId!: number;
}

export function userRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
    UserRecipe.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Assuming you have a User model
        key: 'id',
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipes',  // Assuming you have a Recipe model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user_recipes',
    timestamps: false,
  }
);

return UserRecipe;  // Export the UserRecipe model
}
