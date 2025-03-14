import React, {useState} from "react";

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Buscar videojuegos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="borde p-2 rounded-lg w-full"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buscar</button> 
        </div>
    );
};

export default SearchBar;