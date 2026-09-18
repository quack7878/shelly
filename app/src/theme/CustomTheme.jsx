import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createContext, useState, useEffect } from 'react'
import { useColorScheme, CssVarsProvider } from '@mui/material/styles'
import { save, get } from '../services/preferences'

const DEFAULT = 'GREEN'
export const themes = {
  GREEN: createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#a6ca93',
          },
          background: { 
            default: 'grey.50',
            paper: '#ffffff',      
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#a6ca93',
          },
          background: { 
            default: '#000000',
            paper: '#000000',      
          },
        },
      },
    },
  }),

  PINK: createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#d822ba',
          },
          background: { 
            default: 'grey.50',
            paper: '#ffffff',      
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#d822ba',
          },
          background: { 
            default: '#000000',
            paper: '#000000',      
          },
        },
      },
    },
  }),
}

export const ThemeContext = createContext(null)

function CustomThemeContent({ children }) {
  const { mode, setMode } = useColorScheme()

  const [tint, setTint] = useState()

  useEffect(() => {
    async function initializeColor() {
      setTint(await get('tint'))
      setMode(await get('mode'))
    }

    initializeColor()
  }, [])

  useEffect(() => {
    async function setColor() {
      if (!tint) return

      await save('tint', tint)
      await save('mode', mode)

      const color = (themes[tint]).colorSchemes[mode ?? "light"].palette.background.default
      document.documentElement.style.setProperty("--bg", color)

      const metaThemeColor = document.querySelector('meta[name="theme-color"]') | null

      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color)
      }
    }

    setColor()
  }, [tint, mode])

  return (
    <ThemeContext.Provider value={{ tint, setTint }}>
      <ThemeProvider theme={themes[tint?? DEFAULT]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

function CustomTheme({ children }) {
  return (
    <CssVarsProvider defaultMode="light">
      <CustomThemeContent>{children}</CustomThemeContent>
    </CssVarsProvider>
  )
}

export default CustomTheme
