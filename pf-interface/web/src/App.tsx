import './App.css'
import { RouterProvider } from 'react-router'
import router from './routes'
import { useEffect, useState } from 'react'
import { isEnvBrowser } from './utils/misc'
import useNuiEvent from './hooks/useNuiEvent'
import { CarHudUnit, ReadyListener } from './utils/types'
import { initReactI18next } from 'react-i18next'
import i18n from "i18next";
import Editor from './components/Editor'
import { useIsConfigured } from './hooks/useIsConfigured'
import { fetchNui } from './utils/fetchNui'
import useVisible from './hooks/useVisible'
import { clearAllData } from './utils/localStorage'
import GamePage from './components/Game/GamePage'
import { SoundProvider } from './contexts/SoundContext'
import { useSetAtom } from 'jotai'
import { configAtom } from './stores/config'
import { AnimatePresence, motion } from 'framer-motion'

if (isEnvBrowser()) {
  import('@/mocks/open');
  document.body.style.backgroundImage = 'url(https://wallpapercat.com/w/full/5/1/f/130392-3840x2160-desktop-4k-grand-theft-auto-5-wallpaper-image.jpg)'
}

function App() {
  const { isConfigured, isLoading } = useIsConfigured()
  const [editorVisible, setEditorVisible] = useState(false)
  const setConfig = useSetAtom(configAtom)
  useEffect(() => {
    fetchNui('initialized');
  }, [])

  useNuiEvent<ReadyListener>('onUiReady', (data) => {
    i18n.use(initReactI18next).init({
      lng: data.languageName,
      resources: data.resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    })
    setConfig(data.config)
  })

  useNuiEvent('clear_all_data', () => {
    clearAllData()
  })

  useNuiEvent('toggle_editor_menu', (visible: boolean) => {
    setEditorVisible(visible)
  })

  const [visible] = useVisible('initialize_ui')

  if (!visible || isLoading) return null;

  return (
    <SoundProvider>
      <AnimatePresence mode="wait">
        {isConfigured ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <GamePage />
            <Editor visible={editorVisible} onClose={() => setEditorVisible(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <RouterProvider router={router} />
          </motion.div>
        )}
      </AnimatePresence>
    </SoundProvider>
  )
}

export default App
