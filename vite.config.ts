import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: '/src'
    }],
  },
  server: {
    proxy: {
      // Forcer IPv4 pour éviter les problèmes avec ::1
      '/api': 'http://127.0.0.1:5000'
    }
  }
});
