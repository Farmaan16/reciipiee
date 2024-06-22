// BottomNavbar.tsx

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsHouseDoor, BsHeart } from "react-icons/bs";

const BottomNavbar = () => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname); // Set activeLink based on current pathname
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white text-zinc-700 p-4 flex justify-center gap-28 items-center md:hidden">
      <Link
        to="/"
        className={`text-lg font-semibold flex items-center space-x-2 ${
          activeLink === "/" ? "text-blue-500" : ""
        }`}
        onClick={() => setActiveLink("/")}
      >
        <BsHouseDoor className="text-lg" />
        <span>Home</span>
      </Link>
      <Link
        to="/favorites"
        className={`text-lg font-semibold flex items-center space-x-2 ${
          activeLink === "/favorites" ? "text-blue-500" : ""
        }`}
        onClick={() => setActiveLink("/favorites")}
      >
        <BsHeart className="text-lg" />
        <span>Favorites</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
