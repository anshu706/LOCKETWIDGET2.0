import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/LOCKETWIDGET2.0/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
