import addToWatchlist from "./movieDetails";
const baseURL =
    import.meta.env.VITE_BASE_URL;
const apiKey =
    import.meta.env.VITE_TMDB_API_KEY;

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const results = document.getElementById("searchResults");

// ✅ Populate genres on page load
fetchGenres();
addToWatchlist()

async function fetchGenres() {
    try {
        const res = await fetch(`${baseURL}/genre/movie/list?api_key=${apiKey}`);
        const data = await res.json();
        data.genres.forEach((genre) => {
            const option = document.createElement("option");
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (err) {
        console.error("Error loading genres:", err);
    }
}

// ✅ Handle search
form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const query = input.value.trim();
    const genreId = genreSelect.value;

    results.innerHTML = "<p>Searching...</p>";

    try {
        let url = "";

        if (query) {
            // 🔍 Search by movie name
            url = `${baseURL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        } else if (genreId) {
            // 🔍 Search by genre
            url = `${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
        } else {
            results.innerHTML = "<p>Please enter a keyword or select a genre.</p>";
            return;
        }

        const res = await fetch(url);
        const data = await res.json();
        displayResults(data.results);
    } catch (error) {
        console.error("Search error:", error);
        results.innerHTML = "<p>Error loading results.</p>";
    }
});

// ✅ Display search results
function displayResults(movies) {
    if (!movies || movies.length === 0) {
        results.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.innerHTML = movies
        .map(
            (movie) => `
      <div class="movie-card">
        <a href="/movie_page/movieDetails.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
          
        </a>
      </div>
    `
        )
        .join("");
}
