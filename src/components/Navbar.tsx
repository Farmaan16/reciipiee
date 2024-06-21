// Navbar.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { MdSearch, MdClose } from "react-icons/md";

function Navbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  };

  const handleClearInput = () => {
    setInput("");
  };

  return (
    <nav className="py-2 px-4 h-16 bg-white mb-16 mt-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link to={"/"} className="flex items-center">
          <GiKnifeFork size={25} />
          <h1 className="logo ml-2">Reciipiee</h1>
        </Link>
        <form
          onSubmit={handleSearchSubmit}
          className="mt-4 md:mt-0 md:ml-4 flex items-center bg-white border border-zinc-500 text-black rounded-xl px-2"
        >
          <MdSearch
            size={20}
            onClick={handleSearchSubmit}
            className="cursor-pointer"
          />
          <input
            type="text"
            className="bg-white text-black px-4 py-2 w-full rounded-xl focus:outline-none"
            placeholder="Search recipes here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {input && (
            <MdClose
              size={20}
              className="cursor-pointer ml-2"
              onClick={handleClearInput}
            />
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
