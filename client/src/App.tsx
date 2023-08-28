import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import Recipe from "./pages/Recipe";
import Account from "./pages/Account";
import { useEffect } from "react";
import npProgress from "nprogress";
import "nprogress/nprogress.css";
import DetailRecipe from "./pages/Recipe/Detail";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/Auth/Login";
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
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="recipe/:slug/detail" element={<DetailRecipe />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
