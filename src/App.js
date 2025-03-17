import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameDetalle from "./pages/GameDetalle";

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
