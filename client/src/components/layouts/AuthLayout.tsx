import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-[80vh]  w-full grid place-items-center">
      <div className="w-[90%] lg:w-full max-w-lg bg-white border">
        <Outlet />
      </div>
    </div>
  );
}
