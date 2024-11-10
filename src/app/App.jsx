// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import OtherComponent from "./components/OtherComponent";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/other" element={<OtherComponent />} />
    </Routes>
  </Router>
);

export default App;
