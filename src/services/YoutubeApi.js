const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export const fetchYoutubeTrailer = async (gameName) => {
    try {
        const params = new URLSearchParams({
            key: YOUTUBE_API_KEY,
            q: `${gameName} trailer`,
            part: "snippet",
            maxResults: 1,
            type: "video",
        });

        const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params}`);
        const data = await response.json();

        if (data.items.length > 0) {
            return `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el tráiler de YouTube:", error);
        return null;
    }
};
