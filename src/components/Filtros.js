import React, {useState, useEffect} from "react";
import { fetchGenres, fetchPlatforms, fetchTags, fetchDevelopers} from "../services/api";

const Filtros = ({onFilterChange}) => {
    // Estados locales para almacenar las opciones de filtros
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [tags, setTags] = useState([]);
    const [developers, setDevelopers] = useState([]);

    // Estados locales para almacenar valores de los filtros seleccionados
    const [year, setYear] = useState("");
    const [selectedGenre, setSelecteGenre] = useState("");
    const [selectedPlatform, setSelectPlatform] = useState("");
    const [selectedTag, setSelectTag] = useState("");
    const [selectedDeveloper, setSelectedDeveloper] = useState("");

    // Se usa useEffect para obtener los datos de los filtros
    useEffect(() => {
        fetchGenres().then((data) => setGenres(data.results)); // Carga los géneros
        fetchPlatforms().then((data) => setPlatforms(data.results)); // Carga las plataformas
        fetchTags().then((data) => setTags(data.results)); // Carga los tags
        fetchDevelopers().then((data) => setDevelopers(data.results)); // Carga los desarrolladores
    }, []);

    // Función que se ejecuta cuando se aplican los filtros
    const handleFilterChange = () => {
        onFilterChange({ // Se llama a la función onFilterChange para aplicar los filtros
            year, 
            genre: selectedGenre, 
            platform: selectedPlatform, 
            tag: selectedTag,
            developer: selectedDeveloper,
        });
    };

    return (
        <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            {/* Filtro para seleccionar el año */}
            <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Año</option>
                {/* Se muestran los ultimos 10 años */}
                {Array.from({ length: 10}, (_, i) => new Date().getFullYear() -i).map((yr) =>(
                    <option key={yr} value={yr}>{yr}</option>
                ))}
            </select>

            {/* Filtro para seleccionar el género */}
            <select value={selectedGenre} onChange={(e) => setSelecteGenre(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Género</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.slug}>{genre.name}</option>
                ))}
            </select>

            {/* Filtro para seleccionar la plataforma */}
            <select value={selectedPlatform} onChange={(e) => setSelectPlatform(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Plataforma</option>
                {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
            </select>

            {/* Filtro para seleccionar el tag */}
            <select value={selectedTag} onChange={(e) => setSelectTag(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Tag</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.slug}>{tag.name}</option>
                ))}
            </select>

            {/* Filtro para seleccionar el desarrollador*/}
            <select value={selectedDeveloper} onChange={(e) => setSelectedDeveloper(e.target.value)} className="p-2 border rounded-lg">
                <option value="">Seleccionar Empresa</option>
                {developers.map((developer) => (
                    <option key={developer.id} value={developer.slug}>{developer.name}</option>
                ))}
            </select>

            {/* Botón para aplicar los filtros seleccionados */}
            <button onClick={handleFilterChange} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Aplicar Filtros</button>
        </div>
    );
};

export default Filtros;