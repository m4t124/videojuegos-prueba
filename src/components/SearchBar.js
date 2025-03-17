import React, {useState} from "react";

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState(""); // Estado local para almacenar el valor de búsqueda

    // Función que se ejecuta cuando se hace clic en el botón de busqueda
    const handleSearch = () => { 
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="flex gap-2">
            {/* Campo de entrada para escribir el término de búsqueda */}
            <input
                type="text"
                placeholder="Buscar videojuego..." // Placeholder que muestra el texto cuando no hay nada escrito
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Actualiza el estado con el valor que se haya escrito
                className="borde p-2 rounded-lg w-full" // Clases de estilo
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buscar</button> {/* Botón para realizar la búsqueda */}
        </div>
    );
};

export default SearchBar;