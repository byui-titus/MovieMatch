export default function renderMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>⭐ ${movie.vote_average}</p>
    <button data-id="${movie.id}">Details</button>
  `;
    card.querySelector('button').addEventListener('click', () => {
        window.location.href = `movieDetails.html?id=${movie.id}`;
    });
    return card;
}