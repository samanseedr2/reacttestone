import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("envvvvv", env.VITE_ENV);

  return {
    plugins: [react()],
    base: env.VITE_ENV == "gh" ? "/reacttestone" : "/",
    build: { outDir: "build" },
  };
});
