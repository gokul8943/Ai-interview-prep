import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react-speech-recognition', 'regenerator-runtime/runtime'],
  },
  server: {
    host: 'localhost',
    port: 5173,
    https: undefined as any,
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/interview': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
