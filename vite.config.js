import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(
    import.meta.url);
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
                about: resolve(__dirname, "src/about/about.html"),
                contact: resolve(__dirname, "src/about/contact.html"),
                terms: resolve(__dirname, "src/about/terms.html"),
            },
        },
    },
});