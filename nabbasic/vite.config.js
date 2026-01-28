import { defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


const config = defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname,'../nabBack/dist'),
    emptyOutDir: true
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your Express backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export default config;

