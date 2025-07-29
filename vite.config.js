import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "/",

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
