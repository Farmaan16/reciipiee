import { FC } from "react";
import parse from "html-react-parser";
import { Recipe } from "../types/recipe";

type RecipeDetailsProps = {
  activeTab: string;
  recipe: Recipe;
};

const RecipeDetails: FC<RecipeDetailsProps> = ({ activeTab, recipe }) => {
  if (activeTab === "ingredients") {
    return (
      <div role="tabpanel">
        <ul>
          {recipe.extendedIngredients &&
            recipe.extendedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id} className="list-disc">
                  {ingredient.original}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  if (activeTab === "instructions") {
    return (
      <div role="tabpanel">
        {recipe.instructions && parse(recipe.instructions)}
      </div>
    );
  }

  return null;
};

export default RecipeDetails;
