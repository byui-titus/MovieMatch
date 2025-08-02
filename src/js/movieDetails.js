import { getStreamingAvailability } from './streamingService.js';

const baseURL =
    import.meta.env.VITE_BASE_URL;
const apiKey =
    import.meta.env.VITE_TMDB_API_KEY; // Store in `.env`

const movieDetailsContainer = document.getElementById("movie-details");


async function fetchFromTMDB(endpoint, params = {}) {
    const url = new URL(`${baseURL}/${endpoint}`);
    url.searchParams.append('api_key', apiKey);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('TMDB API error:', error);
        throw error;
    }
}
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
// Get the movie ID from the URL
async function fetchMovieDetails(id) {
    try {
        // Fetch movie details
        const response = await fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`);
        const movie = await response.json();

        // Fetch trailer videos
        const videoRes = await fetch(`${baseURL}/movie/${id}/videos?api_key=${apiKey}`);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        displayMovieDetails(movie, trailer);
        showStreamingOptions(movie.title);
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}

function displayMovieDetails(movie, trailer) {
    const trailerEmbed = trailer ?
        `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" 
        title="YouTube trailer" frameborder="0" allowfullscreen></iframe>` :
        "<p><em>Trailer not available.</em></p>";

    movieDetailsContainer.innerHTML = `
    <div class="movie-detail-card">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div>
        <h2>${movie.title}</h2>
        <p><strong>Release:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
        <p>${movie.overview}</p>
        <h3>Trailer</h3>
        ${trailerEmbed}
      </div>
    </div>
  `;
    document
        .getElementById("addToWishlistBtn")
        .addEventListener("click", () => addToWishlist(movie.id));
}

fetchMovieDetails(movieId);

async function showStreamingOptions(title) {
    const platforms = await getStreamingAvailability(title);
    const container = document.querySelector("#streamingPlatforms");

    if (!platforms || platforms.length === 0) {
        container.textContent = "Not available on popular platforms.";
        return;
    }

    container.innerHTML = platforms
        .map(p => `<a href="${p.web_url}" target="_blank">${p.name}</a>`)
        .join(", ");
}

// Example usage
showStreamingOptions();

export function addToWishlist(movieId) {
    const saved = localStorage.getItem("witchlist");
    let wishlist = saved ? JSON.parse(saved) : [];

    if (!wishlist.includes(movieId)) {
        wishlist.push(movieId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Movie added to wishlist!");
    } else {
        alert("Movie is already in your wishlist.");
    }
}



// Export common calls
export function getPopularMovies(page = 1) {
    return fetchFromTMDB('movie/popular', { page });
}
export function getMovieDetails(movieId) {
    return fetchFromTMDB(`movie/${movieId}`);
}
export function searchMovies(query) {
    return fetchFromTMDB('search/movie', { query });
}
