import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// root tsx 파일인 main.tsx에서 index.css를 import 하고
// index.css 안에 import tailwind 해주면 모든 .tsx에서 tailwind 사용 가능해짐
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
