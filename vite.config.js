import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Root path — custom domain jasonvaughan.com via GitHub Pages
  base: '/',
  server: {
    port: 3300,
  },
})

