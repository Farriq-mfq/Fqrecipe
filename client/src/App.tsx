import npProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { RequireAuth } from "react-auth-kit";
import { Route, Routes, useLocation } from "react-router-dom";
import GuestRoutes from "./common/GuestRoutes";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Account from "./pages/Account";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import DetailRecipe from "./pages/Recipe/Detail";
function App() {
  const location = useLocation();

  const progress = () => {
    npProgress.start();
    npProgress.done();
  };

  useEffect(() => {
    progress();
    return () => progress();
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth loginPath={"/auth/login"}>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="recipe/:slug/detail" element={<DetailRecipe />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route
        path="/auth"
        element={
          <GuestRoutes guestPath="/">
            <AuthLayout />
          </GuestRoutes>
        }
      >
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
