import React from "react";
import { Link } from "react-router-dom";
import '../styles/GameCard.css';

const GameCard = ({game}) => {
    return (
        <div className="game-card">
            <Link to={`/game/${game.id}`} className="game-link">
                <img src={game.background_image} alt={game.name} className="game-image" />
                <h3 className="game-title">{game.name}</h3>
                <p className="game-meta">Metacritic: {game.metacritic}</p>
            </Link>
        </div>
    );
};

export default GameCard;