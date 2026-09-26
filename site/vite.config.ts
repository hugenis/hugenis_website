import { resolve } from 'path'
import fs from 'fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function plano2027Plugin(): Plugin {
  return {
    name: 'plano-2027-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/plano_2027') {
          res.writeHead(301, { Location: '/plano_2027/' })
          res.end()
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/plano_2027') {
          res.writeHead(301, { Location: '/plano_2027/' })
          res.end()
          return
        }
        next()
      })
    },
    closeBundle() {
      const srcFile = resolve(__dirname, 'dist/plano_2027/index.html')
      const destFile = resolve(__dirname, 'dist/plano_2027.html')
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), plano2027Plugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        plano_2027: resolve(__dirname, 'plano_2027/index.html'),
      },
    },
  },
})


