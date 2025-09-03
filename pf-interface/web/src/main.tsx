import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { AnimatePresence } from 'framer-motion';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <AnimatePresence mode='wait' initial={true}>
        <App></App>
      </AnimatePresence>
    </HeroUIProvider>
  </StrictMode>,
)
