import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import Courses from "./pages/Courses/Courses";
import EditCourse from "./pages/EditCourse/EditCourse";
import AddCourse from "./pages/AddCourse/AddCourse";
import Materials from "./pages/Materials/Materials";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --------- LANDING PAGE ---------- */}
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/add" element={<AddCourse />} />
          <Route path="/courses/edit/:uuid" element={<EditCourse />} />

          <Route path="/materialsofcourse/:uuid" element={<Materials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
