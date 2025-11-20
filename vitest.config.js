import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js',
    css: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        '**/*.config.js',
        'coverage/**'
      ]
    }
  },
})