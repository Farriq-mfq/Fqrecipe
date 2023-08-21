import React, { FC } from "react";

interface IGrid {
  children: React.ReactNode;
}
const Grid: FC<IGrid> = ({ children }) => {
  return <div className="grid gap-y-4 mt-4">{children}</div>;
};

export default Grid;
