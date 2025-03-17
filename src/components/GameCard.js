import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/GameCard.css';

const GameCard = ({game}) => {

    const navigate = useNavigate();

    const defaultImage = "https://m.media-amazon.com/images/M/MV5BYzA2MTE2YmMtN2UzZi00MTNmLTliNjQtNTk3Yzk0ZjcxODY0XkEyXkFqcGc@._V1_.jpg"
    
    return (
        <div className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
            <img
                src={game.background_image || defaultImage}
                alt={game.name}
                className="game-image"
                onError={(e) => {
                    e.target.onError = null;
                    e.target.src = defaultImage;
                }}
            />
            <h3 className="game-title">{game.name}</h3>
            <p className="game-meta">Metacritic: {game.metacritic || "N/A"}</p>
        </div>
    );
};

export default GameCard;