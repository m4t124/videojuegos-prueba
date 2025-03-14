import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {fetchGameDetalle} from "../services/api";

const GameDetalle = () => {
    const {id} = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGameDetalle(id)
            .then((data) => {
                setGame(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [id]);

    if (loading) return <p>Cargando detalles del videojuego...</p>;
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3x1 font-bold">{game.name}</h1>
            <img src={game.background_image} alt={game.name} className="w-full h-80 object-cover rounder-lg mt-4" />
            <p className="mt-2 text-gray-600">{game.description_raw}</p>

            <div className="mt-4">
                <p><strong>Metacritic:</strong> {game.metacritic}</p>
                <p><strong>Año de lanzamiento:</strong> {game.released}</p>
                <p><strong>Géneros:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
                <p><strong>Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
            </div>

            {game.clip && (
                <div className="mt-4">
                    <h2 className="text-x1 font-bold">Tráiler</h2>
                    <video controls className="w-full mt-2">
                        <source src={game.clip.clip} type="video/mp4" />
                        Tu navegador no soporta videos.
                    </video>
                </div>
            )}
        </div>
    );
};

export default GameDetalle;