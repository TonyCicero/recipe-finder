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
 * Search Recipes.
 */
export async function searchRecipes(ingredients: string[]): Promise<ApiResponse> {
  try {
    const response = await fetch('https://api.tcicerodev.com:3000/recipe/search', {
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