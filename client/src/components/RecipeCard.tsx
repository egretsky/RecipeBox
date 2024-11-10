import React, { useState } from 'react';
import { SpoonacularRecipe } from '../interfaces/recipe';  // Import the Recipe interface

interface RecipeCardProps {
  recipe: SpoonacularRecipe;
  onClose: (id: number) => void;
  onSave: (recipe: SpoonacularRecipe) => void;
  selectRecipe: (index: number) => void;
  isProfile?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, selectRecipe, onClose, isProfile }) => {
  const [activeTab, setActiveTab] = useState<string>('ingredients');  // State to manage the active tab

  const getLocalImg = () => {
    const localRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const imgList: string[] = [];
    if (localRecipes.length > 0) {
      localRecipes.forEach((recipe: SpoonacularRecipe) => {
        imgList.push(recipe.imageUrl || '');
      });
    }
    return imgList;
  }

  console.log('Recipe:', recipe);

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      </div>
      <div className="recipe-details-container">
        {isProfile ? 
        <div className='card-delete-button' onClick={() => onClose(recipe.id)}>
          <span>X</span>
        </div>
         : 
         null}
        <div className="recipe-title">
          <h3>{recipe.title}</h3>
          <button onClick={() => onSave(recipe)} className="save-button">&#9825;</button>  {/* Outline heart for save */}
        </div>
        <div className="recipe-tabs">
          <div
            className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </div>
          <div
            className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </div>
          <div
            className={`tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'ingredients' && (
            <div className='scrollable-detail'>
              {recipe.ingredients.map((ingredient) => (<ul>{ingredient}</ul>))}
            </div>
          )}
          {activeTab === 'instructions' && (
            <div className='scrollable-detail'>
              {recipe.instructions.map((step, index) => (<ul>{index+1}: {step}</ul>))}
            </div>
          )}
          {activeTab === 'nutrition' && (
            <div className='scrollable-detail'>
              <p className='recipe-details'>
                <ul>Calorie: {recipe.calories}kcal</ul>
                <ul>Fat: {recipe.fat}g</ul>
                <ul>Protein: {recipe.protein}g</ul>
                <ul>Carbohydrate: {recipe.carbohydrates}g</ul>
                <ul>Sugar: {recipe.sugar}g</ul>
                <ul>Sodium: {recipe.sodium}mg</ul>
              </p>
            </div>
          )}
        </div>

        <div className="image-selection">
          {!isProfile ? (
            getLocalImg().map((url, index) => (
              <img
                src={url}
                className="mini-img"
                onClick={() => selectRecipe(index)}
                key={index} // Always add a unique 'key' prop for lists in React
              />
            ))
          ) : (
            <div></div> // You can leave this empty or render some default message
          )}
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;
