import { Link } from "react-router-dom";
import { Recipe } from "../types/recipe";

function AllRecipesCard({ id, title, image, readyInMinutes }: Recipe) {
  return (
    <Link
      to={"/recipe/" + id}
      className="flex w-full h-full rounded-2xl overflow-hidden "
      style={{ textDecoration: "none" }}
    >
      <div className="w-1/3">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="w-2/3 bg-black bg-opacity-10 text-zinc-700 p-4  items-center ">
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
