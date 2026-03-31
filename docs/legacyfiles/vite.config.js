import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT for GitHub Pages under https://jason-vaughan.github.io/jasonvaughan.com/
  base: '/jasonvaughan.com/',
})

