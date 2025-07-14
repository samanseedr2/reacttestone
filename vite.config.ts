import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const env = process.env;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env.VITE_ENV == "gh" ? "/reacttestone" : "/",
  build: { outDir: "build" },
});
