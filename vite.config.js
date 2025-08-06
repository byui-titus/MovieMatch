import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
//import { signup } from "lint/utils/user";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        watch_list: resolve(__dirname, "src/watch_list/watch_list.html"),
        movieDetails: resolve(__dirname, "src/movie_page/movieDetails.html"),
        login: resolve(__dirname, "src/login/login.html"),
        signup: resolve(__dirname, "src/login/signup.html"),
        about: resolve(__dirname, "src/about/about.html"),
        contact: resolve(__dirname, "src/about/contact.html"),
        terms: resolve(__dirname, "src/about/terms.html"),
        search: resolve(__dirname, "src/search/search.html"),
      },
    },
  },
});
