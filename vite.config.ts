import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/brostep/',
  build: {
    // Reduce memory usage
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          utils: ['axios', 'socket.io-client']
        }
      }
    },
    // Disable source maps to save memory
    sourcemap: false,
    // Reduce minification memory usage
    minify: 'esbuild',
    target: 'es2015'
  }
})
