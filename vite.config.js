import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'ImpactGuru - Crowdfunding for Good',
        short_name: 'ImpactGuru',
        description: "India's trusted crowdfunding platform for causes.",
        theme_color: '#FF5722',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      }
    })
  ],
  // ─── Dev proxy: forward /api requests to Express backend ───
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://impactguruclone-backend-production.up.railway.app',
        changeOrigin: true,
      }
    }
  }
})
