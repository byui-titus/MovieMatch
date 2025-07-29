import { getPopularMovies } from './movieDetails.js';
import renderMovieCard from './MovieCard.mjs';

async function loadHomePageMovies() {
    const container = document.querySelector('.movie-grid');
    container.innerHTML = 'Loading...';

    try {
        const data = await getPopularMovies();
        container.innerHTML = '';

        data.results.forEach((movie) => {
            const card = renderMovieCard(movie);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = 'Failed to load movies.';
        console.error(error);
    }
}

loadHomePageMovies();
document.getElementById("year").textContent = new Date().getFullYear();
