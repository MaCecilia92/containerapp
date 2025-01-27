import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import ModuleFederationPlugin from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      ModuleFederationPlugin({
        name: "containerApp",
        remotes: {
          componentsApp: `${env.VITE_REMOTE_URL}/assets/remoteEntry.js`,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },

    define: {
      __APP_ENV__: JSON.stringify(env.VITE_REMOTE_URL),
    },
  };
});
