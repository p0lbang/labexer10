import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/game" element={<Game />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
