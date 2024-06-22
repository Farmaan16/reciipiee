import { Ingredient } from "./ingredient";

export type Recipe = {
  id: string;
  title: string;
  image: string;

  readyInMinutes: number;
  instructions?: string;
  extendedIngredients?: Ingredient[];
};
