import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdTimer,
  MdRestaurantMenu,
  MdAttachMoney,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import Spinner from "../components/Spinner";
import { RouteParams } from "../types/routeParams";
import { Recipe } from "../types/recipe";

function RecipePage() {
  const params = useParams<RouteParams>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    const getRecipeInfo = async () => {
      setLoading(true);

      try {
        
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
    <div className="max-w-7xl mx-auto my-6 px-4">
      {recipe && (
        <div className="w-[1280px] md:w-3/4 mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {recipe.title}
          </h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="rounded-lg mb-4 mx-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <div className="flex justify-around mb-4">
            <div className="flex items-center space-x-2">
              <MdTimer size={20} />
              <span>{recipe.readyInMinutes} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdRestaurantMenu size={20} />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdAttachMoney size={20} />
              <span>${recipe.pricePerServing.toFixed(1)} per serving</span>
            </div>
          </div>

          <div className="max-w-7xl ">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 max-w-7xl">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("ingredients")}
                >
                  <h3 className="text-xl font-semibold">Ingredients</h3>
                  {expandedSections.includes("ingredients") ? (
                    <MdExpandLess size={20} />
                  ) : (
                    <MdExpandMore size={20} />
                  )}
                </div>
                {expandedSections.includes("ingredients") && (
                  <div className="grid grid-cols-2  gap-3 mt-2">
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

              <div className="border rounded-lg p-4 max-w-7xl">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("instructions")}
                >
                  <h3 className="text-xl font-semibold">Instructions</h3>
                  {expandedSections.includes("instructions") ? (
                    <MdExpandLess size={20} />
                  ) : (
                    <MdExpandMore size={20} />
                  )}
                </div>
                {expandedSections.includes("instructions") && (
                  <div
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                    className="text-gray-700 mt-2 "
                  />
                )}
              </div>

              <div className="border rounded-lg p-4 max-w-7xl">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("summary")}
                >
                  <h3 className="text-xl font-semibold">Quick Summary</h3>
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

              <div className="border rounded-lg p-4 w-full">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("nutrition")}
                >
                  <h3 className="text-xl font-semibold">Nutrition</h3>
                  {expandedSections.includes("nutrition") ? (
                    <MdExpandLess size={20} />
                  ) : (
                    <MdExpandMore size={20} />
                  )}
                </div>
                {expandedSections.includes("nutrition") && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <p>Calories: {recipe.calories}g</p>
                    <p>Protein: {recipe.protein}g</p>
                    <p>Fat: {recipe.fat}g</p>
                    <p>Carbs: {recipe.carbs}g</p>
                  </div>
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
