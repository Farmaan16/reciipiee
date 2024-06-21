import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import Spinner from "./Spinner";
import Carousel from "./Carousel";
import { Recipe } from "../types/recipe";

function Vegetarian() {
  const [veggieRecipes, setVeggieRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const getVeggieRecipes = useCallback(async () => {
    setLoading(true);

    try {
      const storedVeggieRecipes = localStorage.getItem("vegetarian");

      if (storedVeggieRecipes) {
        setVeggieRecipes(JSON.parse(storedVeggieRecipes));
      } else {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=6&tags=vegan`
        );

        const data = await res.json();
        setVeggieRecipes(data.recipes);
        localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
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
    getVeggieRecipes();
  }, [getVeggieRecipes]);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-3xl font-semibold">Vegetarian Picks</h2>
      <small className="text-xs text-gray-500">Swipe to see more</small>

      {loading ? <Spinner /> : <Carousel recipes={veggieRecipes} />}
    </div>
  );
}

export default Vegetarian;
