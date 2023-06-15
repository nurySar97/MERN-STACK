import React from "react";
import "materialize-css";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { Routes } from "react-router-dom";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) return <Loader />;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      {isAuthenticated && <Navbar />}
      <div className="container">
        <Routes>{routes}</Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
