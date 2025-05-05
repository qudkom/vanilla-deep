import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() /* .module.css, .tsx에서 tailwind를 적용하기 위해 필요. 없어도 radix의 스타일은 적용됨 */],
  resolve: {
    alias: {
      '@': '/src', // @을 src 폴더로 매핑
      '@components': '/src/components',
      '@assets': '/src/assets',
    },
  },
  // tsconfig.app.json 절대경로 설정은 vscode 등 ide용이고 tsconfig.app.json에서 작성해주지 않으면 vscode에서는 에러로 인식하지만 실행시엔 문제없이 나옴.
  // vite.config.ts 절대경로 설정은 실제 실행시에 사용되는듯. vite.config.ts에 작성해주지 않아도 vscode에서는 에러로 인식하지 않지만 실행시에 에러남.
})
