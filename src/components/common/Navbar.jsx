import { Box, Flex, HStack, Button, IconButton, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import { useState } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Team', path: '/team' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { colorMode, toggleColorMode, colors } = useThemeContext()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box bg={colors.navBg} px={4} py={3} position="sticky" top={0} zIndex={100}>
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link to="/">
          <HStack>
            <Text fontSize="xl" fontWeight="bold" color="white">
              EduQuest
            </Text>
          </HStack>
        </Link>

        <HStack display={{ base: 'none', lg: 'flex' }} gap={4}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Text color="white" fontSize="sm" _hover={{ color: 'orange.300' }} fontWeight="medium">
                {link.name}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack display={{ base: 'none', lg: 'flex' }} gap={3}>
          <IconButton
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            variant="ghost"
            color="white"
            _hover={{ bg: 'teal.700' }}
            size="sm"
          >
            {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
          </IconButton>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/dashboard">
                  <Button size="sm" colorPalette="orange" px={4} py={2}>
                    Dashboard
                  </Button>
                </Link>
              )}
              <Text color="white" fontSize="sm" fontWeight="medium">
                Hi, {user.name}
              </Text>
              <Button size="sm" colorPalette="red" px={4} py={2} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" colorPalette="orange" px={4} py={2}>
                Login
              </Button>
            </Link>
          )}
        </HStack>

        <HStack display={{ base: 'flex', lg: 'none' }} gap={2}>
          <IconButton
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            variant="ghost"
            color="white"
            size="sm"
          >
            {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
          </IconButton>
          <IconButton
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            color="white"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </IconButton>
        </HStack>
      </Flex>

      {isOpen && (
        <Box display={{ base: 'block', lg: 'none' }} pb={4} pt={2}>
          <Flex direction="column" gap={2}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <Text color="white" py={2}>
                  {link.name}
                </Text>
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button size="sm" colorPalette="orange" w="full" px={4} py={2}>
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button size="sm" colorPalette="red" onClick={handleLogout} w="full" px={4} py={2}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button size="sm" colorPalette="orange" w="full" px={4} py={2}>
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default Navbar
