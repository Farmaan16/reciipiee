import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdTimer,
  MdRestaurantMenu,
  MdAttachMoney,
  MdExpandMore,
  MdExpandLess,
  MdPercent,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import Spinner from "../components/Spinner";
import { RouteParams } from "../types/routeParams";
import { Recipe } from "../types/recipe";

function RecipePage() {
  const params = useParams<RouteParams>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  

  useEffect(() => {
    const getRecipeInfo = async () => {
      setLoading(true);

      try {
        const RecipieInfo = localStorage.getItem("RecipieInfo");
        if (RecipieInfo) {
          setRecipe(JSON.parse(RecipieInfo));
        } else {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/${
              params.id
            }/information?apiKey=${import.meta.env.VITE_API_KEY}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch recipe");
          }

          const data = await res.json();
          setRecipe(data);
          localStorage.setItem("RecipieInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
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

    getRecipeInfo();
  }, [params.id]);

  useEffect(() => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isFav = favorites.some((fav: Recipe) => fav.id === recipe.id);
      setIsFavorite(isFav);
    }
  }, [recipe]);

  const toggleFavorite = () => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = favorites.filter((fav: Recipe) => fav.id !== recipe.id);
        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, recipe];
        setIsFavorite(true);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    }
  };
  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(
        expandedSections.filter((section) => section !== sectionName)
      );
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full mx-auto my-6 px-4">
      {recipe && (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold text-zinc-600 mb-4 text-center">
            {recipe.title}
          </h2>
          <div className="flex justify-center mb-4">
            <button onClick={toggleFavorite}>
              {isFavorite ? (
                <MdFavorite size={24} color="red" />
              ) : (
                <MdFavoriteBorder size={24} />
              )}
            </button>
          </div>
          </div>
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="rounded-lg mb-4 mx-auto max-w-full h-auto "
            
          />
           
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4 text-zinc-600 font-semibold">
            <div className="flex items-center space-x-1 mb-2">
              <MdTimer size={20} />
              <span className="text-xs sm:text-base">
                {recipe.readyInMinutes} min
              </span>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              <MdRestaurantMenu size={20} />
              <span className="text-xs sm:text-base">
                {recipe.servings} servings
              </span>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              <MdAttachMoney size={20} />
              <span className="text-xs sm:text-base">
                ${recipe.pricePerServing.toFixed(1)} per serving
              </span>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              <MdPercent size={20} />
              <span className="text-xs sm:text-base">
                {recipe.spoonacularScore.toFixed(1)} Rating
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
  <div className="space-y-6 text-zinc-600">
    <div className="border rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleSection("ingredients")}
      >
        <h3 className="text-lg font-semibold">Ingredients</h3>
        {expandedSections.includes("ingredients") ? (
          <MdExpandLess size={20} />
        ) : (
          <MdExpandMore size={20} />
        )}
      </div>
      {expandedSections.includes("ingredients") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {recipe.extendedIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center space-x-2"
            >
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                className="w-10 h-10 rounded-full"
              />
              <p>{ingredient.original}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="border rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleSection("instructions")}
      >
        <h3 className="text-lg font-semibold">Instructions</h3>
        {expandedSections.includes("instructions") ? (
          <MdExpandLess size={20} />
        ) : (
          <MdExpandMore size={20} />
        )}
      </div>
      {expandedSections.includes("instructions") && (
        <div
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          className="text-gray-700 mt-2"
        />
      )}
    </div>

    <div className="border rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleSection("summary")}
      >
        <h3 className="text-lg font-semibold">Quick Summary</h3>
        {expandedSections.includes("summary") ? (
          <MdExpandLess size={20} />
        ) : (
          <MdExpandMore size={20} />
        )}
      </div>
      {expandedSections.includes("summary") && (
        <p
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
          className="text-gray-700 mt-2"
        />
      )}
    </div>
  </div>
</div>

        </div>
      )}
    </div>
  );
}

export default RecipePage;
