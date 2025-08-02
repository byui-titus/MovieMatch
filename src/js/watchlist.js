import { fetchMovieDetails } from "./movieDetails.js";

const wishlistContainer = document.getElementById("wishlist-container");

// Retrieve movie IDs from localStorage
function getWishlist() {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
}

// Remove movie ID from localStorage and update UI
function removeFromWishlist(movieId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter((id) => id !== movieId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
}

// Display movie cards in the wishlist
async function renderWishlist() {
    wishlistContainer.innerHTML = "<p>Loading...</p>";
    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlistContainer.innerHTML = ""; // Clear previous content

    for (const movieId of wishlist) {
        try {
            const movie = await fetchMovieDetails(movieId);

            const card = document.createElement("div");
            card.classList.add("movie-card");

            card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p><strong>Release:</strong> ${movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
          <button class="remove-btn" data-id="${movie.id}">Remove</button>
          <a href="movieDetails.html?id=${movie.id}">View Details</a>
        </div>
      `;

            // Attach remove button event
            card.querySelector(".remove-btn").addEventListener("click", () => {
                removeFromWishlist(movie.id);
            });

            witchlistContainer.appendChild(card);
        } catch (error) {
            console.error("Error fetching movie for wishlist:", error);
        }
    }
}

// Run on page load
renderWishlist();