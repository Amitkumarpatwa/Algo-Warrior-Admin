import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.ADMIN_EMAIL': JSON.stringify(env.ADMIN_EMAIL),
      'process.env.ADMIN_PASSWORD': JSON.stringify(env.ADMIN_PASSWORD),
      'process.env.ADMIN_NAME': JSON.stringify(env.ADMIN_NAME),
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      }
    }
  }
})
