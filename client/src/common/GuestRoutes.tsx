import React from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
interface IGuestRoutes {
  children: JSX.Element;
  guestPath: string;
}
export default function GuestRoutes({
  children,
  guestPath,
}: IGuestRoutes): React.ReactNode {
  const isAuth = useIsAuthenticated();
  return isAuth() ? <Navigate to={guestPath} /> : children;
}
