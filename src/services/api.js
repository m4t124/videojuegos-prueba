const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = async (filters = {}) => {
    const params = new URLSearchParams({
        key: API_KEY,
        ordering: "-metacritic",
        ...(filters.year && { dates: `${filters.year}-01-01,${filters.year}-12-31` }),
        ...(filters.genre && { genres: filters.genre }),
        ...(filters.platform && { platforms: filters.platform }),
        ...(filters.tag && { tags: filters.tag }),
        ...(filters.developer && { developers: filters.developer }),
        ...(filters.search && { search: filters.search, search_exact: true }),
    });

    const response = await fetch(`${BASE_URL}/games?${params}`);
    return response.json();
};

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

export const fetchGenres = async () => {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    return response.json();
};

export const fetchPlatforms = async () => {
    const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
    return response.json();
};

export const fetchTags = async () => {
    const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`);
    return response.json();
};

export const fetchDevelopers = async () => {
    const response = await fetch(`${BASE_URL}/developers?key=${API_KEY}`);
    return response.json();
};

export const fetchGameDLCs = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/additions?key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error al obtener los DLCs:", error);
        return[];
    }
};

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

export const fetchGameTrailer = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
        const data = await response.json();

        if (data.results.length > 0) {
            return data.results[0].data.max; 
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el tráiler:", error);
        return null;
    }
};

const api = { 
    fetchGames, fetchGameDetalle, fetchGenres, fetchPlatforms, 
    fetchTags, fetchDevelopers, fetchGameDLCs, fetchGameLogros, 
    fetchGameImagenes, fetchGameTrailer
};

export default api;