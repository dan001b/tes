import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Admin from "./Admin";
import Clock from "./Clock";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Main />} />
        </Routes>
        <Clock />
      </div>
    </Router>
  );
}

export default App;
