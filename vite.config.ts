import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
 plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
