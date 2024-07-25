// types/recipe.ts
export interface recipecards {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  maxTitleLength: number;
}

export interface RecipeList {
  key: number;
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  
}
export interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  aggregateLikes: number;
  analyzedInstructions: { name: string }[];
  cookingMinutes: number | null;
  creditsText: string;
  cuisines: string[];
  diets: string[];
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  gaps: string;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  instructions: string;
  lowFodmap: boolean;
  occasions: string[];
  originalId: number | null;
  preparationMinutes: number | null;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  maxTitleLength: number;
}

interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

// types/routeParams.ts

export interface RouteParams {
  id: string;
}
