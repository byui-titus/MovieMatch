const container = document.getElementById("watchlist-container");

function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

function saveWatchlist(movies) {
  localStorage.setItem("watchlist", JSON.stringify(movies));
}

function removeFromWatchlist(id) {
  const list = getWatchlist();
  const updated = list.filter((movie) => movie.id !== id);
  saveWatchlist(updated);
  renderWatchlist();
}

function renderWatchlist() {
  const movies = getWatchlist();
  if (movies.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }

  container.innerHTML = movies
    .map(
      (movie) => `
    <div class="movie-card">
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
      <div>
        <h3>${movie.title}</h3>
        <p>${movie.release_date}</p>
        <button data-id="${movie.id}">Remove</button>
      </div>
    </div>
  `,
    )
    .join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      removeFromWatchlist(id);
    });
  });
}

renderWatchlist();
