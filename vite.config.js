import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    root: "./",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                watchlist: resolve(__dirname, "watchlist.html"),
                movieDetails: resolve(__dirname, "movieDetails.html"),
            },
        },
    },
});
