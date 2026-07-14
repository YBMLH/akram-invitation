import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'sbib-theme'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeCtx | null>(null)

/** Light/dark theme shared across the app, persisted in localStorage. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    // البورجندي (الوضع الداكن) هو الافتراضي؛ النهاري فقط إذا اختاره الزائر صراحةً
    return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeCtx(): ThemeCtx {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeCtx must be used inside ThemeProvider')
  return ctx
}
