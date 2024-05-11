import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminHomePage />} />
    </Routes>
  );
};

export default App;
