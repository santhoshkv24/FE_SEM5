import { createContext, useContext } from 'react'
import { useColorMode, useColorModeValue } from '@/components/ui/color-mode'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const colors = {
    // Backgrounds
    bg: useColorModeValue('white', 'gray.900'),
    bgAlt: useColorModeValue('gray.50', 'gray.800'),
    cardBg: useColorModeValue('white', 'gray.800'),
    
    // Text
    text: useColorModeValue('gray.800', 'white'),
    textMuted: useColorModeValue('gray.600', 'gray.400'),
    textSubtle: useColorModeValue('gray.500', 'gray.500'),
    
    // Primary (Teal)
    primary: 'teal.600',
    primaryHover: useColorModeValue('teal.700', 'teal.500'),
    primaryLight: useColorModeValue('teal.100', 'teal.900'),
    primaryText: useColorModeValue('#319795', '#81E6D9'),
    
    // Accent (Orange)
    accent: 'orange',
    accentLight: useColorModeValue('orange.100', 'orange.900'),
    
    // Navbar/Footer
    navBg: 'teal.600',
    footerBg: useColorModeValue('gray.800', 'gray.950'),
    
    // Borders
    border: useColorModeValue('gray.200', 'gray.700'),
    
    // Hero sections
    heroBg: 'teal.600',
    heroText: 'white',
    heroTextMuted: useColorModeValue('teal.100', 'teal.200'),
  }

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}
