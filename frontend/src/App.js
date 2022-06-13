import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./routes/Feed";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact={true} path="/" element={<Home />} />

        <Route exact={true} path="/sign-up" element={<SignUp />} />
        <Route exact={true} path="/log-in" element={<Login />} />
        <Route exact={true} path="/feed" element={<Feed />} />
        {/* not in final */}
        <Route exact={true} path="/signup" element={<SignUp />} />
        <Route exact={true} path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
