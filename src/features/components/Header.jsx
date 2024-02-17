import React from "react";
import { Link } from "react-router-dom";
import Menu from "../layouts/Menu";
import Dropdown from "../layouts/Dropdown";

function Header() {
  return (
    <header className="grid grid-cols-3 bg-[#006094] shadow px-4 items-center text-white">
      <Link to={"/"}>
        <div className="text-center p-3">cashflow</div>
      </Link>
      <div className="flex justify-center">
        <Menu />
      </div>
      <div className="flex justify-center">
        <Dropdown />
      </div>
    </header>
  );
}

export default Header;
