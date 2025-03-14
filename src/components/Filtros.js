import React, {useState, useEffect} from "react";
import { fetchGenres, fetchPlatforms} from "../services/api";

const Filtros = ({onFilterChange}) => {
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [year, setYear] = useState("");
    const [selectedGenre, setSelecteGenre] = useState("");
    const [selectedPlatform, setSelectPlatform] = useState("");

    useEffect(() => {
        fetchGenres().then((data) => setGenres(data.results));
        fetchPlatforms().then((data) => setPlatforms(data.results));
    }, []);

    const handleFilterChange = () => {
        onFilterChange({ year, genre: selectedGenre, platform: selectedPlatform });
    };

    return (
        <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Año</option>
                {Array.from({ length: 10}, (_, i) => new Date().getFullYear() -i).map((yr) =>(
                    <option key={yr} value={yr}>{yr}</option>
                ))}
            </select>

            <select value={selectedGenre} onChange={(e) => setSelecteGenre(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Género</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.slug}>{genre.name}</option>
                ))}
            </select>

            <select value={selectedPlatform} onChange={(e) => setSelectPlatform(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Plataforma</option>
                {platforms.map((platform) => (
                    <option key={platform.id} value={platform.slug}>{platform.name}</option>
                ))}
            </select>

            <button onClick={handleFilterChange} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Aplicar Filtros</button>
        </div>
    );
};

export default Filtros;