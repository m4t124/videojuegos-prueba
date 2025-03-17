import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/GameCard.css'; // Estilos de GameCard

const GameCard = ({game}) => {

    const navigate = useNavigate(); // Hook para naver entre páginas

    // Imagen para el videojuego "Soulcalibur (1998)"
    const defaultImage = "https://m.media-amazon.com/images/M/MV5BYzA2MTE2YmMtN2UzZi00MTNmLTliNjQtNTk3Yzk0ZjcxODY0XkEyXkFqcGc@._V1_.jpg"
    
    return (
        <div className="game-card" onClick={() => navigate(`/game/${game.id}`)}> {/* Al hacer clic en la tarjeta, se dirige a los detalles del videojuego */}
            <img
                src={game.background_image || defaultImage} // Imagen del videojuego
                alt={game.name} // Texto para la imagen
                className="game-image" // Clase para el estilo de la imagen
                onError={(e) => { // Si la imagen no carga, se cambia a la imagen por defecto, que en este caso es "Soulcalibur (1998)"
                    e.target.onError = null;
                    e.target.src = defaultImage;
                }}
            />
            <h3 className="game-title">{game.name}</h3> {/* Nombre del videojuego */}
            <p className="game-meta">Metacritic: {game.metacritic || "N/A"}</p> {/* Puntuación del videojuego o "N/A* si no existe */}
        </div>
    );
};

export default GameCard;