import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetalle, fetchGameDLCs, fetchGameLogros, fetchGameImagenes, fetchGameTrailer } from "../services/api";
import '../styles/GameDetalle.css';

const GameDetalle = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(null);
    const [dlcs, setDlcs] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameData = await fetchGameDetalle(id);
                setGame(gameData);

                const dlcData = await fetchGameDLCs(id);
                setDlcs(dlcData);

                const achievementsData = await fetchGameLogros(id);
                setAchievements(achievementsData);
    
                const trailerUrl = await fetchGameTrailer(id);
                setTrailer(trailerUrl);

                const screenshotsData = await fetchGameImagenes(id);
                setScreenshots(screenshotsData);
    
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
                <p><strong>Desarrollador:</strong> {game.developers?.map(dev => dev.name).join(", ") || "N/A"}</p>
                <p><strong>Duración promedio:</strong> {game.playtime? `${game.playtime} horas`: "N/A"}</p>

            </div>

            {trailer ? (
                <div className="trailer-container">
                    <h2 className="trailer-title">Tráiler</h2>
                    <video width="800" height="450" controls>
                        <source src={trailer} typs="video/mp4" />
                        Tu navegador no soporta la reproducción de videos.
                    </video>
                </div>
            ) : (
                <p>No hay tráiler disponible.</p>
            )}

            {screenshots.length > 0 && (
                <div className="screenshots-container">
                    <h2 className="screenshots-title">Imágenes</h2>
                    <div className="screenshots-grid">
                        {screenshots.map((screenshot) => (
                            <img 
                                key={screenshot.id} 
                                src={screenshot.image} 
                                alt="Imagenes" 
                                className="screenshots-image" 
                            />
                        ))}
                    </div>
                </div>
            )}

            {achievements.length > 0 && (
                <div className="game-achievements">
                    <h2 className="achievements-title">Logros y Trofeos</h2>
                    <ul className="achievements-list">
                        {achievements.map((achievement) => (
                            <li key={achievement.id} className="achievement-item">
                                <img src={achievement.image} alt={achievement.name} className="achievement-image" />
                                <div>
                                    <strong>{achievement.name}</strong> - {achievement.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {dlcs.length > 0 && (
                <div className="game-dlcs">
                    <h2>DLCs y Expansiones</h2>
                    <ul>
                        {dlcs.map((dlc) => (
                            <li key={dlc.id}>
                                <strong>{dlc.name}</strong> - {dlc.released || "Fecha desconocida"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default GameDetalle;
