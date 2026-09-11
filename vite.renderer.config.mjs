import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig({
      plugins: [react()],
      server: {
            host: '127.0.0.1',
            port: 5173,
            proxy: {
                  '/auth': 'http://localhost:5001',
                  '/player': 'http://localhost:5001'
            }
      }
});