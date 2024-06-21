import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState<string>("");

  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/search/" + input);

    setInput("");
  };

  return (
    <div className="m-2 flex item-center justify-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full md:w-1/2 bg-black text-white flex items-center rounded-xl px-2"
      >
        <MdSearch size={20} onClick={handleSearchSubmit} />
        <input
          type="text"
          className="bg-black text-white px-4 py-2 w-full rounded-xl focus:outline-none"
          placeholder="Search recipes here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
