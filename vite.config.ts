import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { seoSnapshot } from './vite-plugins/seo-snapshot'

export default defineConfig({
  plugins: [react(), seoSnapshot()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/pepy': {
        target: 'https://pepy.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pepy/, ''),
      },
      '/api/contact': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contact/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
