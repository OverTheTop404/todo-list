import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // ← УЖЕ ТАК, НО МОЖЕТ НЕ ПРИМЕНЯТЬСЯ
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  experimental: {
    renderBuiltUrl: (filename: string) => {
      return `/${filename}` // ПРИНУДИТЕЛЬНО делаем пути абсолютными
    },
  },
})
