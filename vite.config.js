import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        hmr: {
            host: "localhost",
        },
        watch: {
            // FORCE VITE À SURVEILLER ACTIVEMENT LES FICHIERS SOUS DOCKER
            usePolling: true,
            interval: 100, // Vérification toutes les 100ms
        },
        cors: {
            origin: "*",
        },
    },
});
