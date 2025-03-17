import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetalle, fetchGameDLCs, fetchGameLogros, fetchGameImagenes, fetchGameTrailer } from "../services/api";
import '../styles/GameDetalle.css'; // Estilos de GameDetalle

const GameDetalle = () => {
    const { id } = useParams(); // Obtiene el ID del videojuego desde los parámetros de la URL
    const [game, setGame] = useState(null); // Estado para almacenar los detalles
    const [loading, setLoading] = useState(true); // Estado para controlar si los datos están cargados
    const [trailer, setTrailer] = useState(null); // Estado para almacenar la URL del tráiler
    const [dlcs, setDlcs] = useState([]); // Estado para almacenar los DLCs
    const [achievements, setAchievements] = useState([]); // Estado para almacenar los logros
    const [screenshots, setScreenshots] = useState([]); // Estado para almacenar las imagenes

    // Se usa useEffect para ejecutar la función de obtener datos cuamdo cambia el 'id' del videojuego
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Aqui se llama a la API para obtener los detalles del videjuego
                const gameData = await fetchGameDetalle(id); // Obtiene los detalles principales del videojuego
                setGame(gameData);

                const dlcData = await fetchGameDLCs(id); // Obtiene los DLCs del videjuego
                setDlcs(dlcData);

                const achievementsData = await fetchGameLogros(id); // Obtiene los logros del videjuego
                setAchievements(achievementsData);
    
                const trailerUrl = await fetchGameTrailer(id); // Obtiene la URL del tráiler
                setTrailer(trailerUrl);

                const screenshotsData = await fetchGameImagenes(id); // Obtiene las imágenes del videojuego
                setScreenshots(screenshotsData);
    
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setLoading(false);
            }
        };
    
        fetchData(); // Llama a la función para obtener los datos del videojuego
    }, [id]);
    
    if (loading) return <p className="loading">Cargando detalles del videojuego...</p>;

    return (
        <div className="game-container">
            <h1 className="game-detail-title">{game.name}</h1> {/* Nombre del videojuego */}

            <div className="image-container">
                <img src={game.background_image} alt={game.name} className="game-image" /> {/* Portada del videojuego */}
            </div>

            <p className="game-description">{game.description_raw}</p> {/* Descripción del videojuego */}

            <div className="game-details">
                <p><strong>Metacritic:</strong> {game.metacritic || "N/A"}</p>
                <p><strong>Año de lanzamiento:</strong> {game.released || "N/A"}</p>
                <p><strong>Géneros:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
                <p><strong>Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
                <p><strong>Desarrollador:</strong> {game.developers?.map(dev => dev.name).join(", ") || "N/A"}</p>
                <p><strong>Duración promedio:</strong> {game.playtime? `${game.playtime} horas`: "N/A"}</p>

            </div>

            {/* Se visualiza el tráiler si es que está disponible */}
            {trailer ? (
                <div className="trailer-container">
                    <h2 className="trailer-title">Tráiler</h2>
                    <video width="800" height="450" controls>
                        <source src={trailer} typs="video/mp4" />
                        Tu navegador no soporta la reproducción de videos.
                    </video>
                </div>
            ) : (
                <p>No hay tráiler disponible.</p> // Si no hay tráiler, se muestra este mensaje
            )}

            {/* Imagenes del videojuego */}
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

            {/* Logros del videojuego */}
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

            {/* DLCs disponibles */}
            {dlcs.length > 0 && (
                <div className="game-dlcs">
                    <h2>DLCs y Expansiones</h2>
                    <div className="dlcs-container">
                        {dlcs.map((dlc) => (
                            <Link key={dlc.id} to={`/game/${dlc.id}`} className="dlc-item-link">
                            <div className="dlc-item">
                                {dlc.background_image && (
                                    <img src={dlc.background_image} alt={dlc.name} className="dlc-image" />
                                )}
                                <div>
                                    <strong>{dlc.name}</strong> - {dlc.released || "Fecha desconocida"}
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default GameDetalle;
