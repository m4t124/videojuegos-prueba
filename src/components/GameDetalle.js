import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetalle} from "../services/api";
import { fetchYoutubeTrailer } from "../services/YoutubeApi";
import '../styles/GameDetalle.css';

const GameDetalle = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameData = await fetchGameDetalle(id);
                setGame(gameData);
    
                const trailerUrl = await fetchYoutubeTrailer(gameData.name);
                setTrailer(trailerUrl);
    
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id]);
    

    if (loading) return <p className="loading">Cargando detalles del videojuego...</p>;

    return (
        <div className="game-container">
            <h1 className="game-detail-title">{game.name}</h1>

            <div className="image-container">
                <img src={game.background_image} alt={game.name} className="game-image" />
            </div>

            <p className="game-description">{game.description_raw}</p>

            <div className="game-details">
                <p><strong>Metacritic:</strong> {game.metacritic || "N/A"}</p>
                <p><strong>Año de lanzamiento:</strong> {game.released || "N/A"}</p>
                <p><strong>Géneros:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
                <p><strong>Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
            </div>

            {trailer && (
                <div className="trailer-container">
                    <h2 className="trailer-title">Tráiler</h2>
                    <iframe
                        width="800"
                        height="450"
                        src={trailer}
                        title="Youtube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="trailer-video"
                    />
                </div>
            )}

        </div>
    );
};

export default GameDetalle;
