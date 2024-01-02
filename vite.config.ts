import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
        },
    },
    plugins: [react()],
    server: {
        port: 3000,
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        },
    },
});
