import React from "react";
import { Link, LinkProps, NavLink } from "react-router-dom";

interface IAppLink extends LinkProps {
  children?: React.ReactNode;
}

const AppLink: React.FC<IAppLink> = (props) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending ? `app__link__pending` : isActive ? `app__link__active` : `uppercase text-gray-500`
      }
      {...props}
    >
      {props.children}
    </NavLink>
  );
};

export default AppLink;
