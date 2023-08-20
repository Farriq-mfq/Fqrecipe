import React from "react";
interface IMainLayout {
  children: React.ReactNode;
}
const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      HEADER
      {children}
      FOOTER
    </>
  );
};

export default MainLayout;
