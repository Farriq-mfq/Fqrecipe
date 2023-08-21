import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
interface IMainLayout {}
const MainLayout: React.FC<IMainLayout> = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="mt-5 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
