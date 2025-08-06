const baseURL =
    import.meta.env.VITE_BASE_URL;
const apiKey =
    import.meta.env.VITE_TMDB_API_KEY;

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResultsContainer = document.getElementById("searchResults");

// Mapping of common genres to TMDB IDs
const genreMap = {
    action: 28,
    comedy: 35,
    drama: 18,
    romance: 10749,
    thriller: 53,
    horror: 27,
    adventure: 12,
    animation: 16,
    documentary: 99,
};

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    // 1. Check if it's a known genre
    if (genreMap[query]) {
        searchByGenre(genreMap[query]);
    } else {
        // 2. Otherwise, do a normal search by title/actor
        searchByMulti(query);
    }
});

// 🔍 Genre Search
async function searchByGenre(genreId) {
    try {
        const res = await fetch(
            `${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
        );
        const data = await res.json();
        displayResults(data.results);
    } catch (error) {
        console.error("Genre search error:", error);
    }
}

// 🔍 Multi-Search (title or person)
async function searchByMulti(query) {
    try {
        const res = await fetch(
            `${baseURL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        // Filter for only movies (and maybe include people if needed)
        const filtered = data.results.filter((item) => item.media_type === "movie");
        displayResults(filtered);
    } catch (error) {
        console.error("Multi-search error:", error);
    }
}

// 🎬 Display results
function displayResults(movies) {
    if (!searchResultsContainer) return;

    if (!movies.length) {
        searchResultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    searchResultsContainer.innerHTML = movies
        .map(
            (movie) => `
    <div class="movie-card">
      <a href="movieDetails.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average || "N/A"}</p>
      </a>
    </div>
  `
        )
        .join("");
}