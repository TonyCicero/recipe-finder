interface Recipe {
  url: string;
  title: string;
  ingredients: string[];
  ingredients_no_measurements: string[];
  instructions: string[];
  matchCount?: number;
  image?: any;
}

interface ApiResponse {
  recipes: Recipe[];
  count: number;
}

/**
 * List Suggested.
 */
export async function listSuggested(count?: number): Promise<ApiResponse> {
  try {
    const response = await fetch('https://node.tcicerodev.com:3000/recipe/suggested', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

/**
 * Search Recipes.
 */
export async function searchRecipes(ingredients: string[]): Promise<ApiResponse> {
  try {
    const response = await fetch('https://node.tcicerodev.com:3000/recipe/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

export type { Recipe, ApiResponse };