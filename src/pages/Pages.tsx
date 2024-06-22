import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import RecipePage from "./RecipePage";

import { AnimatePresence } from "framer-motion";
import Favorites from "../components/Favorites";
import BottomNavbar from "../components/BottomNavbar";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:name" element={<Cuisine />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/search/:query" element={<Searched />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <BottomNavbar />
    </AnimatePresence>
  );
}

export default Pages;
