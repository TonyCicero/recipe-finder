import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "./components/search-bar";
import { RecipeCard } from "./components/recipe-card";
import { searchRecipes} from "./services/recipe-api";
import { ChefHat, Loader2 } from "lucide-react";
import { Recipe } from "./services/recipe-api";
import { RecipeDetail } from "./components/recipe-detail";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setRecipes([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchRecipes(ingredients);
      setRecipes(response.recipes || []);
    } catch (err) {
      setError('Failed to search recipes.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const ingredients = searchTerm
        .split(",")
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
      
      performSearch(ingredients);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, performSearch]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setRecipes([]);
    setError(null);
    setHasSearched(false);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  // Show recipe detail if a recipe is selected
  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={handleBackToList}
        searchTerm={searchTerm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <ChefHat className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-center">Recipe Finder</h1>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={handleClearSearch}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="mb-6">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching for recipes...</span>
            </div>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : hasSearched ? (
            <p className="text-muted-foreground">
              Showing {recipes.length} recipes containing: <span className="font-medium">{searchTerm}</span>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Enter ingredients above to search for recipes
            </p>
          )}
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted h-4 rounded w-3/4"></div>
                  <div className="bg-muted h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.url}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        ) : hasSearched && !error ? (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching with different ingredients or check your spelling.
            </p>
            <button
              onClick={handleClearSearch}
              className="text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : !hasSearched && !error ? (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start searching for recipes</h3>
            <p className="text-muted-foreground">
              Enter ingredients in the search bar above to find delicious recipes you can make.
            </p>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>Find delicious recipes based on the ingredients you have!</p>
        </div>
      </footer>
    </div>
  );
}