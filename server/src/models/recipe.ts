import { DataTypes, Sequelize, Model, Optional, type CreationOptional, type ForeignKey } from 'sequelize';
import { RecipeModel } from './recipeInterface';
import { User } from './user';

interface RecipeCreationAttributes extends Optional<Recipe, 'cookingTime' | 'preparationTime' | 'imageUrl' | 'id'> {}

interface DetailedRecipe extends RecipeModel {
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    sodium: number;
}

export class Recipe extends Model<DetailedRecipe, RecipeCreationAttributes> implements Recipe {
    public id!: CreationOptional<number>;
    public spoonacularID!: number;
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
                autoIncrement: true,
                primaryKey: true,
            },
            spoonacularID: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            calories: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            fat: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            protein: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            carbohydrates: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            sugar: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            sodium: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
        sequelize,
        tableName: 'recipes',
        }
    );
    
    return Recipe;
}