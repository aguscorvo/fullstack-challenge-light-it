import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000/",
    },
    host: "0.0.0.0",
    port: 5137,
  },
  plugins: [react()],
});
