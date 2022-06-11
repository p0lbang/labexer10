import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./routes/Feed";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Feed />} />
        <Route exact={true} path="/sign-up" element={<SignUp />} />
        <Route exact={true} path="/log-in" element={<Login />} />
        <Route exact={true} path="/feed" element={<Feed />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
