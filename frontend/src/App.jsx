import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Attributions from "./pages/Attributions";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attributions" element={<Attributions />} />
      </Routes>
    </>
  );
};

export default App;
