import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-pageflip')) return 'vendor-pageflip'
          if (id.includes('gsap')) return 'vendor-gsap'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/') ||
            id.includes('react-router') ||
            id.includes('@remix-run')
          ) {
            return 'vendor-react'
          }
          return undefined
        },
      },
    },
  },
})
