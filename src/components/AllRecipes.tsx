import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import Spinner from "./Spinner";
import { RecipeList } from "../types/recipe";
import AllRecipesCard from "./AllRecipesCard";

function AllRecipes() {
  const [allRecipes, setAllRecipes] = useState<RecipeList[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllRecipes = useCallback(async () => {
    setLoading(true);

    try {
      const storedAllRecipes = localStorage.getItem("All Recipes");

      if (storedAllRecipes) {
        setAllRecipes(JSON.parse(storedAllRecipes));
      } else {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=15`
        );

        const data = await res.json();
        setAllRecipes(data.recipes);
        localStorage.setItem("All Recipes", JSON.stringify(data.recipes));
      }
    } catch (error) {
      toast.error("Failed to fetch recipes, try again later!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-xl font-semibold mb-6">All Recipes</h2>
      {/* <small className="text-xs text-gray-700 font-semibold">
        Swipe to see more
      </small> */}

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-16" >
          {allRecipes.map((recipe) => (
            <AllRecipesCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllRecipes;
