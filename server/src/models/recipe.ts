import { DataTypes, Sequelize, Model, Optional, type ForeignKey } from 'sequelize';
import { RecipeModel } from './recipeInterface';
import { User } from './user';

interface RecipeCreationAttributes extends Optional<Recipe, 'cookingTime' | 'preparationTime' | 'imageUrl'> {}

export class Recipe extends Model<RecipeModel, RecipeCreationAttributes> implements Recipe {
    public id!: number;
    public title!: string;
    public ingredients!: string[];
    public instructions!: string[];
    public cookingTime?: number;
    public preparationTime?: number;
    public imageUrl?: string;
    public userID!: ForeignKey<User['id']>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
    Recipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            instructions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            cookingTime: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            preparationTime: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
        sequelize,
        tableName: 'recipes',
        }
    );
    
    return Recipe;
}