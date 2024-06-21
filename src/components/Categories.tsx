import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  GiPaintedPottery,
  GiTacos,
  GiNoodles,
  GiChopsticks,
  GiPotato,
} from "react-icons/gi";
import { BiCheese } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";

const categories = [
  { name: "African", icon: GiPaintedPottery },
  { name: "Italian", icon: FaPizzaSlice },
  { name: "Chinese", icon: GiNoodles },
  { name: "American", icon: FaHamburger },
  { name: "Mexican", icon: GiTacos },
  { name: "British", icon: BiCheese },
  { name: "Spanish", icon: GiPotato },
  { name: "Korean", icon: GiChopsticks },
];

function Categories() {
  const [activeCuisine, setActiveCuisine] = useState<number>();
  return (
    <div className="flex flex-wrap justify-center items-center my-4 gap-4 md:gap-6">
      {categories.map((category, index) => {
        const IconComponent = category.icon;

        const isActive = activeCuisine === index;

        return (
          <NavLink
            to={"/cuisine/" + category.name}
            key={index}
            onClick={() => setActiveCuisine(index)}
            className={`rounded-full w-14 p-2 h-14 flex items-center justify-center flex-col ${
              isActive
                ? "bg-[#febd2f] text-black rounded-full"
                : "bg-black text-white"
            }`}
          >
            <IconComponent size={18} />
            <p className="text-[0.7rem]">{category.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Categories;
