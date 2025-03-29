import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default {
  esbuild: {
    loader: {
      '.js': 'jsx', // .js 파일을 jsx로 처리하도록 설정
    }
  },
};
