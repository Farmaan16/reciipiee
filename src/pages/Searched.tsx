import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Recipe } from "../types/recipe";
import Spinner from "../components/Spinner";
import AllRecipesCard from "../components/AllRecipesCard";
import { BiArrowBack } from "react-icons/bi";

function Searched() {
  const params = useParams();

  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchedRecipe = async (query: string) => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      setSearchedRecipes(data.results);
    } catch (error) {
      toast.error("Failed to fetch recipe, try again later!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchedRecipe(params.query ?? "");
  }, [params.query]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto my-6 space-y-4">
      {searchedRecipes.length > 0 ? (
        <>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold px-6 capitalize">
              {params.query} Recipes
            </h2>
            <Link
              to="/"
              className=" text-xl mr-7 font-semibold flex items-center hover:underline"
            >
              <BiArrowBack className="text-lg mr-2" /> Back
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {searchedRecipes.map((recipe) => {
              return (
                <AllRecipesCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  readyInMinutes={60}
                  image={recipe.image}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-medium px-6">
          No results found for "{params.query}" recipes
        </h2>
      )}
    </div>
  );
}

export default Searched;
