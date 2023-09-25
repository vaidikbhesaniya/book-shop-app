import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Add from "./pages/Add";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books></Books>}></Route>
          <Route path="/add" element={<Add></Add>}></Route>
          <Route path="/update/:id" element={<Update></Update>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
