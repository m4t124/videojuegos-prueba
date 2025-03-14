import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import Filtros from "./Filtros";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchFilteredGames();
  }, [filters]);

  const fetchFilteredGames = async () => {
    setLoading(true);
    const data = await fetchGames(filters);
    setGames(data.results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Videojuegos</h1>
      <SearchBar onSearch={(query) => setFilters({search: query })} />
      <Filtros onFilterChange={(newFilters) => setFilters(newFilters)} />
      {loading ? (
        <p>Cargando Videojuegos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
