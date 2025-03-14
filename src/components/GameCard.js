import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({game}) => {
    return (
        <Link to={`/game/${game.id}`} className="border rounded-lg p-4 shadow-md bg-white block">
            <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
            <p className="text-sm text-gray-600">Metacritic {game.metacritic}</p>
        </Link>
    );
};

export default GameCard;