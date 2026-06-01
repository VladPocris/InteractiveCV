import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isMigration = process.env.VITE_DEPLOY_SUBPATH === "migration";
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: isMigration ? "/InteractiveCV/migration/" : "/InteractiveCV/",
  };
});
