import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    DataTypes,
    type Sequelize,
    ForeignKey,
  } from 'sequelize';

import { Recipe } from './recipe';

export class Nutrition extends Model<InferAttributes<Nutrition>, InferCreationAttributes<Nutrition>> implements Nutrition {
    declare calories: number;
    public fat!: number;
    public protein!: number;
    public carbohydrates!: number;
    public recipeID!: ForeignKey<Recipe['id']>;
}

export function NutritionFactory(sequelize: Sequelize): typeof Nutrition {
    Nutrition.init(
        {
            calories: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fat: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            protein: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            carbohydrates: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
        sequelize,
        timestamps: false,
        tableName: 'nutrition',
        }
    );
    
    return Nutrition;
}