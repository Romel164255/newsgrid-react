import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // During dev, forward /api/* to the Vercel dev server on port 3001
      // Run "vercel dev" instead of "npm run dev" — it starts both together
      // If you must use plain "npm run dev", run "node devserver.cjs" in a
      // separate terminal so these proxy targets resolve.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
