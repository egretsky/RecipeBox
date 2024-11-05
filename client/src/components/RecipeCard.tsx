import React, { useState } from 'react';
import { Recipe } from '../interfaces/recipe';  // Import the Recipe interface

interface RecipeCardProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<string>('ingredients');  // State to manage the active tab

  return (
    <div className="recipe-card">
      <button onClick={onClose} className="close-button">X</button>
      <div className="recipe-image-container">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      </div>
      <div className="recipe-details-container">
        <div className="recipe-title">
          <h3>{recipe.title}</h3>
          <button onClick={onSave} className="save-button">&#9825;</button>  {/* Outline heart for save */}
        </div>
        <div className="recipe-tabs">
          <button
            className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button
            className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button
            className={`tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'ingredients' && (
            <div>
              <h4>Ingredients</h4>
              <p>{recipe.ingredients.join(', ')}</p>
            </div>
          )}
          {activeTab === 'instructions' && (
            <div>
              <h4>Instructions</h4>
              <p>{recipe.instructions.join(', ')}</p>
            </div>
          )}
          {activeTab === 'nutrition' && (
            <div>
              <h4>Nutrition</h4>
              <p>Nutrition info goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
