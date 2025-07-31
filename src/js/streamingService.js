// streamingService.js
const baseURL =
    import.meta.env.VITE_WATCHMODE_BASE_URL;
const apiKey =
    import.meta.env.VITE_WATCHMODE_API_KEY;

export async function getStreamingAvailability(title) {
    try {
        // Step 1: Search for the movie to get its Watchmode ID
        const searchRes = await fetch(
            `${baseURL}/search/?apiKey=${apiKey}&search_field=name&search_value=${encodeURIComponent(title)}`
        );
        const searchData = await searchRes.json();

        const movie = searchData.title_results[0];
        if (!movie) return null;

        // Step 2: Get sources (platforms)
        const sourcesRes = await fetch(
            `${baseURL}/title/${movie.id}/sources/?apiKey=${apiKey}`
        );
        const sources = await sourcesRes.json();

        // Return filtered sources (like Netflix, Prime, etc.)
        return sources.filter(src => src.type === "sub" || src.type === "buy");
    } catch (err) {
        console.error("Streaming service fetch error:", err);
        return null;
    }
}