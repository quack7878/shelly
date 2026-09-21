import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',

  build: {
    outDir: "../public",
    emptyOutDir: true
  },

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },

      manifest: {
        id: '/',
        name: 'Shelly',
        short_name: 'Shelly',
        description: 'A local reading tracker',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',

        icons: [
          {
            src: '/icons/icon_192X192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon_512X512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
