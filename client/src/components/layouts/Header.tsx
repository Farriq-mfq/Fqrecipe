import React from "react";
import AppLink from "../common/AppLink";

const Header: React.FC<{}> = () => {
  return (
    <header className="sticky top-3 mx-3 z-[9999]">
      <nav className="navbar bg-white shadow-xl rounded-box flex lg:justify-center justify-evenly lg:space-x-5 items-center h-16 mx-auto ">
        <AppLink to={"/"}>Home</AppLink>
        <AppLink to={"/recipe"}>Recipe</AppLink>
        <AppLink to={"/account"}>Account</AppLink>
      </nav>
    </header>
  );
};

export default Header;
