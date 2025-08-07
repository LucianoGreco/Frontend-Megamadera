// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // OPCIONAL: solo si querés evitar CORS usando proxy (no necesario por ahora)
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:4000',
  //     '/products': 'http://localhost:4000',
  //   }
  // }
});
