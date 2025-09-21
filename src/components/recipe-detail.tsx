import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RecipeImage } from "./recipe-image";
import { Recipe } from "../services/recipe-api";


interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  searchTerm?: string;
}

export function RecipeDetail({ recipe, onBack, searchTerm }: RecipeDetailProps) {
  const highlightIngredient = (ingredient: string) => {
    if (!searchTerm) return ingredient;
    
    const searchTerms = searchTerm
      .toLowerCase()
      .split(",")
      .map(term => term.trim())
      .filter(term => term.length > 0);
    
    const isHighlighted = searchTerms.some(term => 
      ingredient.toLowerCase().includes(term)
    );
    
    return isHighlighted ? (
      <span className="bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded">
        {ingredient}
      </span>
    ) : ingredient;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to recipes
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recipe Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <RecipeImage
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full"
              />
            </div>
            
            {/* Recipe Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{recipe.instructions}</p>
            
              </div>
        
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                      <span className="text-sm">
                        {highlightIngredient(ingredient)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </main>
    </div>
  );
}