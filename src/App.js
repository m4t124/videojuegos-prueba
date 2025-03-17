import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameDetalle from "./pages/GameDetalle";

//Este código es el componente principal, el cual configura las rutas utilizando React Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal que muestra la lista de videojuegos */}
        <Route path="/game/:id" element={<GameDetalle />} /> {/* Ruta de los detalles principales de un videojuego */}
      </Routes>
    </Router>
  );
}

export default App;
