import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    port: 6769,
    proxy: {
      "/api": {
        target: "http://localhost:9948",
        //target: "http://194.195.243.27:9235"
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
