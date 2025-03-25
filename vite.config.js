import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // build:{
  //   outDir: 'C:\\Users\\m.tomashivskyi\\source\\repos\\UrlShortener\\UrlShortener\\wwwroot\\',
  //   emptyOutDir: true,// Якщо ви хочете, щоб Vite очищав папку перед кожною збіркою
  // },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:44387', // Адреса вашого бекенду
  //   },
  // },
  plugins: [react()],
})
