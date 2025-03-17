const API_KEY = process.env.REACT_APP_RAWG_API_KEY; // La clave de la API se obtiene desde el archivo .env
const BASE_URL = "https://api.rawg.io/api"; // La URL de la API de RAWG para realizar las peticiones

// Solicitud para obtener una lista de videojuegos con filtros aplicados
export const fetchGames = async (filters = {}) => {
    const params = new URLSearchParams({
        key: API_KEY,
        ordering: "-metacritic", // Se ordenan los videojuegos de forma descendente
        ...(filters.year && { dates: `${filters.year}-01-01,${filters.year}-12-31` }), // Filtro por año
        ...(filters.genre && { genres: filters.genre }), // Filtro por género
        ...(filters.platform && { platforms: filters.platform }), // Filtro por plataforma
        ...(filters.tag && { tags: filters.tag }), // Filtro por tag
        ...(filters.developer && { developers: filters.developer }), // Filtro por desarrollador del videojuego
        ...(filters.search && { search: filters.search, search_exact: true }), // Filtro de búsqueda
    });

    const response = await fetch(`${BASE_URL}/games?${params}`);
    return response.json();
};

// Solicitud para obtener detalles especificos de un videojuego
export const fetchGameDetalle = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al buscar detalles del videojuego:", error);
        return null;
    }
};

// Solicitud para obtener una lista de géneros de videojuegos
export const fetchGenres = async () => {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    return response.json();
};

// Solicitud para obtener la lista de plataformas disponibles
export const fetchPlatforms = async () => {
    const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
    return response.json();
};

// Solicitud para obtener una lista de etiquetas disponibles
export const fetchTags = async () => {
    const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`);
    return response.json();
};

// Solicitud para obtener una lista de los desarrolladores de videojuegos
export const fetchDevelopers = async () => {
    const response = await fetch(`${BASE_URL}/developers?key=${API_KEY}`);
    return response.json();
};

// Solicitud para obtener los DLCs de un videojuego
export const fetchGameDLCs = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/additions?key=${API_KEY}`);
        const data = await response.json();
        
        const dlcsWithImages = await Promise.all(data.results.map(async (dlc) => { // Obtener detalles adicionales para cada DLC
            const dlcDetailsResponse = await fetch(`${BASE_URL}/games/${dlc.slug}?key=${API_KEY}`);
            const dlcDetails = await dlcDetailsResponse.json();

            return { 
                ...dlc, 
                background_image: dlcDetails.background_image || null // Se agrega una imagen para el DLC si está disponible
            };
        }));

        return dlcsWithImages;
    } catch (error) {
        console.error("Error al obtener los DLCs:", error);
        return [];
    }
};

// Solicitud para obtener los logros de un videojuego
export const fetchGameLogros = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/achievements?key=${API_KEY}`);
        const data = await response.json();

        if (data.results.length > 0) {
            return data.results;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los logros:", error);
        return [];
    }
};

// Solicitud para obtener imágenes de un videojuego
export const fetchGameImagenes = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error al obtener las imágenes del videojuego:", error);
        return [];
    }
};

// Solicitud para obtener el tráiler de un videojuego
export const fetchGameTrailer = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
        const data = await response.json();

        if (data.results.length > 0) {
            return data.results[0].data.max; 
        } else {
            return null; // Si no hay tráiler, retorna null
        }
    } catch (error) {
        console.error("Error al obtener el tráiler:", error);
        return null;
    }
};

// Se exportan las funciones para ser utilizadas
const api = { 
    fetchGames, fetchGameDetalle, fetchGenres, fetchPlatforms, 
    fetchTags, fetchDevelopers, fetchGameDLCs, fetchGameLogros, 
    fetchGameImagenes, fetchGameTrailer
};

export default api;