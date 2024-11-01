const apiKey = process.env.SPOONACULAR_API_KEY;
const baseUrl = 'https://api.spoonacular.com/recipes/';
const recipeNum = 3; // Number of recipes to return

const recipeDataByIngre = async (ingredients: string) => {
    try {
        const response = await fetch (`${baseUrl}findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=${recipeNum}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching recipes by ingredients: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

const recipeTimeByID = async (id: number) => {
    try {
        const response = await fetch (`${baseUrl}${id}/information?apiKey=${apiKey}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching recipes by ingredients: ', err);
        return Promise.reject('Could not fetch recipes');
    }
}

export { recipeDataByIngre };
export { recipeTimeByID };