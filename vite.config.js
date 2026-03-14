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
        name: 'FundDoo - Together we Save Lives',
        short_name: 'FundDoo',
        description: "India's trusted crowdfunding platform for causes.",
        theme_color: '#1B9B6C',
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
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  }
})
