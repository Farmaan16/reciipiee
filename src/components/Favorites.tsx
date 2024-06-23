import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="w-full mx-auto my-6 px-4">
      <h2 className="text-xl font-bold text-zinc-600 mb-4 text-center">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg mb-2 max-w-full h-auto"
              />
              <div className="flex items-center justify-between">
                <p>{recipe.readyInMinutes} min</p>
                <p>{recipe.servings} servings</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>${recipe.pricePerServing.toFixed(1)} per serving</p>
                <p>{recipe.spoonacularScore.toFixed(1)} Rating</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
