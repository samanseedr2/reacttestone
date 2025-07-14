/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), "");
  const env = process.env;

  return {
    plugins: [react()],
    base: env.VITE_ENV == "gh" ? "/reacttestone" : "/",
    build: { outDir: "build" },
  };
});
