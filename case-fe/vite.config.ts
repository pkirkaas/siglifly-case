import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8934,
    proxy: {
      "/api": {
        target: "http://localhost:9948",
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
