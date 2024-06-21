import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function Navbar() {
  return (
    <nav className="py-2 px-4 h-16">
      <div className="max-w-7xl mx-auto ">
        <Link to={"/"} className="flex items-center">
          <GiKnifeFork size={25} />
          <h1 className="logo">Reciipiee</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
