//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Cadastrar from "./Cadastrar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar" element={<Cadastrar  />} />
        <Route path="/chat" element={<Chat  />} />
      </Routes>
    </Router>
  );
}

export default App;
