import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import GameDetalle from "./components/GameDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
