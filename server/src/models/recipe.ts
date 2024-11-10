import { DataTypes, Sequelize, Model, Optional, type CreationOptional, type ForeignKey } from 'sequelize';
import { RecipeModel } from './recipeInterface';
import { User } from './user';

interface RecipeCreationAttributes extends Optional<RecipeModel, 'cookingTime' | 'preparationTime' | 'imageUrl' | 'id'> {}

export class Recipe extends Model<RecipeModel, RecipeCreationAttributes> implements Recipe {
    declare id: CreationOptional<number>;
    public spoonacularID!: number;
    public title!: string;
    public ingredients!: string[];
    public instructions!: string[];
    public cookingTime?: number;
    public preparationTime?: number;
    public imageUrl?: string;
    public userID!: ForeignKey<User['id']>;
    public calories!: number;
    public fat!: number;
    public protein!: number;
    public carbohydrates!: number;
    public sugar!: number;
    public sodium!: number;

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
                type: DataTypes.TEXT,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            instructions: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
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
                type: DataTypes.TEXT,
                allowNull: true,
            },
            calories: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            fat: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            protein: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            carbohydrates: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            sugar: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            sodium: {
                type: DataTypes.DECIMAL(10, 2),
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