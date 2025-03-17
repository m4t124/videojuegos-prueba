import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api"; // Función para obtener videojuegos desde la API
import GameCard from "../components/GameCard"; // Componente para mostrar los detalles del videojuego
import SearchBar from "../components/SearchBar"; // Componente de la barra de búsqueda
import Filtros from "../components/Filtros"; // Componente para filtrar los videojuegos
import '../styles/Home.css'; // Estilos de Home

const Home = () => {
  const [games, setGames] = useState([]); // Se almacenan los videojuegos obtenidos
  const [loading, setLoading] = useState(true); // Controla la carga de datos
  const [filters, setFilters] = useState({}); // Se almacenan los filtros seleccionados

  // Se usa useEffect para ejecutar la función fetchFilteredGames cada ves que los filtros cambien
  useEffect(() => {
    const fetchFilteredGames = async () => {
      setLoading(true);
      const data = await fetchGames(filters); // Llama a la función para obtener los videojuegos filtrados
      setGames(data.results);
      setLoading(false);
    };
    
    fetchFilteredGames();
  }, [filters]); // El efecto se ejecuta cada vez que el estado 'filters' cambia

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videojuegos UGPS</h1> {/* Título de Home */}
      <SearchBar onSearch={(query) => setFilters({search: query })} /> {/* Componente de busqueda */}
      <Filtros onFilterChange={(newFilters) => setFilters(newFilters)} /> {/* Componente de filtros */}
      {loading ? (
        <p>Cargando Videojuegos...</p>
      ) : (
        <div className="games-container">
          {games.map((game) => (
            <GameCard key={game.id} game={game} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
