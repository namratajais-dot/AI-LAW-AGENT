import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";

function App() {
  return (
    <Router basename="/AI-LAW-AGENT">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
