import React from "react";
import { Navigate, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";
import AddWordPage from "./pages/AddWordPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/addWord" element={<AddWordPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to={"create"} />} />
      </>
    );
  }
  return (
    <>
      <Route index path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </>
  );
};
