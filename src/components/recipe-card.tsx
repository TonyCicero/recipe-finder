
import { ImageWithFallback } from "./imageWithFallback";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Recipe } from "../services/recipe-api";


interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card 
      className="h-full transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}>
      <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
          <div className="flex gap-1 shrink-0">
            {recipe.matchCount && (
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                {Math.round((recipe.matchCount / recipe.ingredients_no_measurements.length) * 100)}% match
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients_no_measurements.slice(0, 4).map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
              {recipe.ingredients.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{recipe.ingredients.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}