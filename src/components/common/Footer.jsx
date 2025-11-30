import { Box, Flex, Text, HStack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useThemeContext } from '@/context/ThemeContext'

const Footer = () => {
  const { colors } = useThemeContext()
  
  return (
    <Box bg={colors.footerBg} color="white" py={10} px={4}>
      <Flex maxW="1200px" mx="auto" direction={{ base: 'column', md: 'row' }} gap={8} justify="space-between">
        <VStack align="start" gap={3}>
          <Text fontSize="xl" fontWeight="bold">
            EduQuest
          </Text>
          <Text color="gray.400" maxW="300px">
            Explore, Learn, and Thrive with our comprehensive online courses designed for your success.
          </Text>
          <HStack gap={4} pt={2}>
            <FaFacebook cursor="pointer" />
            <FaTwitter cursor="pointer" />
            <FaLinkedin cursor="pointer" />
            <FaInstagram cursor="pointer" />
          </HStack>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Quick Links</Text>
          <Link to="/about"><Text color="gray.400" _hover={{ color: 'white' }}>About Us</Text></Link>
          <Link to="/courses"><Text color="gray.400" _hover={{ color: 'white' }}>Courses</Text></Link>
          <Link to="/pricing"><Text color="gray.400" _hover={{ color: 'white' }}>Pricing</Text></Link>
          <Link to="/contact"><Text color="gray.400" _hover={{ color: 'white' }}>Contact</Text></Link>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Resources</Text>
          <Link to="/blog"><Text color="gray.400" _hover={{ color: 'white' }}>Blog</Text></Link>
          <Link to="/testimonials"><Text color="gray.400" _hover={{ color: 'white' }}>Testimonials</Text></Link>
          <Link to="/team"><Text color="gray.400" _hover={{ color: 'white' }}>Our Team</Text></Link>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Contact Info</Text>
          <HStack color="gray.400">
            <FiMail />
            <Text>info@eduquest.com</Text>
          </HStack>
          <HStack color="gray.400">
            <FiPhone />
            <Text>+91 -  9361888416</Text>
          </HStack>
          <HStack color="gray.400">
            <FiMapPin />
            <Text>Boys Hostel (Vedavati/Ganga), SRM AP, Guntur</Text>
          </HStack>
        </VStack>
      </Flex>

      <Box borderTop="1px" borderColor="gray.700" mt={8} pt={6}>
        <Text textAlign="center" color="gray.500">
          © 2025 EduQuest. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
