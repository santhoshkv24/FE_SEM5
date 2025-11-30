import { Box, Text, VStack, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '@/context/ThemeContext'

const NotFound = () => {
  const { colors } = useThemeContext()

  return (
    <Box py={20} px={4} textAlign="center" minH="60vh">
      <VStack gap={6}>
        <Text fontSize="8xl" fontWeight="bold" color="teal.600">404</Text>
        <Text fontSize="2xl" fontWeight="bold" color={colors.text}>Page Not Found</Text>
        <Text color={colors.textSubtle} maxW="400px">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Text>
        <Link to="/">
          <Button colorPalette="teal" size="lg" px={6} py={3}>
            Go Back Home
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default NotFound
