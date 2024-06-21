import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import Spinner from "./Spinner";
import Carousel from "./Carousel";
import { Recipe } from "../types/recipe";

function Dessert() {
  const [desserts, setDesserts] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const getDesserts = useCallback(async () => {
    setLoading(true);

    try {
      const storedDesserts = localStorage.getItem("desserts");

      if (storedDesserts) {
        setDesserts(JSON.parse(storedDesserts));
      } else {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=6&tags=dessert`
        );

        const data = await res.json();
        setDesserts(data.recipes);
        localStorage.setItem("desserts", JSON.stringify(data.recipes));
      }
    } catch (error) {
      toast.error("Failed to fetch recipes, try again later!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDesserts();
  }, [getDesserts]);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-3xl font-semibold">Desserts</h2>
      <small className="text-xs text-gray-500">Swipe to see more</small>

      {loading ? <Spinner /> : <Carousel recipes={desserts} />}
    </div>
  );
}

export default Dessert;
