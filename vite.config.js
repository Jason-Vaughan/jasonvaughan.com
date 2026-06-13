import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Root path — custom domain jasonvaughan.com via GitHub Pages
  base: '/',
  server: {
    port: 3300,
    // Bind all interfaces so the dev server is reachable from other machines
    // on the Tailscale tailnet (e.g. reviewing from a second box).
    host: true,
    // Vite's host check blocks non-IP hostnames by default. Allow any
    // Tailscale MagicDNS host (`*.ts.net`) so cross-machine access works
    // without hardcoding this tailnet's name into the public repo.
    allowedHosts: ['.ts.net'],
  },
})

