import { Link } from "react-router-dom";
import { recipecards } from "../types/recipe";

function RecipeCard({ id, title, image, readyInMinutes }: recipecards) {
  return (
    <Link
      to={"/recipe/" + id}
      className="relative w-full h-full  hover:rounded-2xl"
      key={id}
      style={{ textDecoration: "none" }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-40 md:h-48 lg:h-64"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 ">
          <div className="absolute bottom-0 left-0 right-0 text-left p-4">
            <p className="text-[9px] text-white md:text-base lg:text-lg font-semibold">
              {title}
            </p>
            <p className="text-[8px] md:text-sm font-semibold text-white">
              Ready in {readyInMinutes} min
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
