# 🎬 MovieMatch

MovieMatch is a responsive web application that helps users discover the perfect movie for their mood, favorite actor, or genre. It features a dynamic search, personalized watchlist, and integration with external APIs to display movie details, trailers, and streaming availability.

## 🌐 Live Demo

👉 [Visit the Live Site](https://mmatch.netlify.app/)

## 🚀 Features

- 🔍 Search movies by name, genre, or actor.
- 🎞 View movie details, including trailers and descriptions.
- 📺 See where movies are streaming via Utelly API.
- ❤️ Add movies to your personal watchlist.
- 🔒 Demo login and sign-up experience (stored locally).
- 📱 Mobile-responsive design.
- ⚙️ Built using HTML, CSS, and vanilla JavaScript.

## 🔧 Tech Stack

- HTML5, CSS (with responsive design)
- JavaScript (ES Modules, no frameworks)
- [TMDB API](https://www.themoviedb.org/documentation/api) – for movie data
- [Utelly API](https://rapidapi.com/utelly/api/utelly) – for streaming availability
- Vite – for fast frontend development
- Netlify – for deployment

## 📁 Folder Structure
📦MovieMatch
├── public/
│ ├── partials/ # Shared header and footer
│ ├── images/ # Static assets
│ └── ...
├── src/
│ ├── api/ # TMDB and Utelly API modules
│ ├── components/ # Reusable JS functions (e.g., movie card renderer)
│ ├── pages/
│ │ ├── home/
│ │ ├── movieDetails/
│ │ ├── search/
│ │ ├── wishlist/
│ │ ├── login/
│ │ └── signup/
│ └── ...
├── .env # API keys
├── vite.config.js # Vite config
├── netlify.toml / _redirects
└── README.md

---

## 🧭 User Guide

### 🎬 Homepage
- Browse popular movies.
- Use the search bar to enter keywords like “comedy”, “Tom Hanks”, or “thriller”.
- Click on any movie card to view more details.

### 🔍 Search Page
- Displays search results based on your query.
- Filters results by genre or actor name.
- Click a movie to view full details.

### 🎞 Movie Details Page
- Shows movie poster, description, rating, release date.
- Embeds a YouTube trailer if available.
- Displays available streaming platforms.

### ❤️ Watchlist Page
- Add any movie to your watchlist from the movie detail view.
- Access your saved watchlist anytime.
- Remove movies from your watchlist.

### 🔐 Login & Signup
- No backend required — signup and login data is saved in localStorage (demo only).
- Allows simulated user access to watchlist features.

