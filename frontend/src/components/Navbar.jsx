import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 sticky top-0 z-20 flex justify-between items-center">
      <Link to={"/"}>
        <div className="text-2xl font-bold">UDAS</div>
      </Link>

      <ul className="inline-flex gap-6">
        <li>Services</li>
        <Link to={"/attributions"}>
          <li>Attributions</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
