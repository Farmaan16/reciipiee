import { Link } from "react-router-dom";
import { RecipeList } from "../types/recipe";

function AllRecipesCard({ id, title, image, readyInMinutes }: RecipeList) {
  return (
    <Link
      to={"/recipe/" + id}
      className="flex w-full h-full rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
      style={{ textDecoration: "none" }}
    >
      <div className="w-1/3 relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-500"></div>
      </div>
      <div className="w-2/3 bg-black bg-opacity-10 text-zinc-700 p-4 flex flex-col justify-center">
        <p className="text-sm md:text-base lg:text-lg font-semibold mb-1 mt-4">
          {title}
        </p>
        <p className="text-xs md:text-sm font-semibold">
          Ready in {readyInMinutes} min
        </p>
      </div>
    </Link>
  );
}

export default AllRecipesCard;
