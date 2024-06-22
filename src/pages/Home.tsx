import { motion } from "framer-motion";

import Popular from "../components/Popular";
import AllRecipes from "../components/AllRecipes";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <Popular />
        <AllRecipes />
        
      </div>
    </motion.div>
  );
}

export default Home;
