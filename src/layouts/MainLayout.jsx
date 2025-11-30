import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { useThemeContext } from '@/context/ThemeContext'

const MainLayout = () => {
  const { colors } = useThemeContext()
  
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={colors.bg}>
      <Navbar />
      <Box as="main" flex="1" bg={colors.bgAlt}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
