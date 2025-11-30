import { Box, Text, VStack, SimpleGrid, Image } from '@chakra-ui/react'
import { FiTarget, FiHeart, FiTrendingUp } from 'react-icons/fi'
import { useThemeContext } from '@/context/ThemeContext'

const values = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    description: 'To democratize education and make quality learning accessible to everyone, everywhere.',
  },
  {
    icon: FiHeart,
    title: 'Our Values',
    description: 'We believe in integrity, innovation, and the transformative power of education.',
  },
  {
    icon: FiTrendingUp,
    title: 'Our Vision',
    description: 'To become the leading platform for skill development and lifelong learning globally.',
  },
]

const About = () => {
  const { colors } = useThemeContext()
  
  return (
    <Box>
      <Box bg={colors.heroBg} color={colors.heroText} py={16} px={4}>
        <VStack maxW="800px" mx="auto" textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold">About EduQuest</Text>
          <Text fontSize="lg" color={colors.heroTextMuted}>
            Empowering learners worldwide since 2020
          </Text>
        </VStack>
      </Box>

      <Box py={16} px={4} bg={colors.bg}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} maxW="1200px" mx="auto" alignItems="center">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600"
            alt="Our team"
            borderRadius="lg"
            shadow="lg"
          />
          <VStack align="start" gap={4}>
            <Text fontSize="3xl" fontWeight="bold" color={colors.text}>Who We Are</Text>
            <Text color={colors.textMuted} lineHeight="tall">
              EduQuest is a premier online learning platform dedicated to providing high-quality education to learners worldwide. Founded in 2020, we have grown to serve over 50,000 students across 50+ countries.
            </Text>
            <Text color={colors.textMuted} lineHeight="tall">
              Our team consists of experienced educators, industry professionals, and technology experts who are passionate about making education accessible and engaging. We offer courses in web development, data science, design, marketing, and more.
            </Text>
            <Text color={colors.textMuted} lineHeight="tall">
              Whether you're looking to start a new career, upgrade your skills, or explore a new hobby, EduQuest has the resources and community to support your learning journey.
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>

      <Box py={16} px={4} bg={colors.bgAlt}>
        <VStack maxW="1200px" mx="auto" gap={10}>
          <Text fontSize="3xl" fontWeight="bold" textAlign="center" color={colors.text}>Our Core Values</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
            {values.map((value, index) => (
              <VStack key={index} bg={colors.cardBg} p={8} borderRadius="lg" shadow="md" gap={4}>
                <Box p={4} bg={colors.primaryLight} borderRadius="full">
                  <value.icon size={32} color={colors.primaryText} />
                </Box>
                <Text fontSize="xl" fontWeight="bold" color={colors.text}>{value.title}</Text>
                <Text color={colors.textMuted} textAlign="center">{value.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      <Box py={16} px={4} bg={colors.bg}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} maxW="1000px" mx="auto" textAlign="center">
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color={colors.primary}>50K+</Text>
            <Text color={colors.textMuted}>Active Students</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color={colors.primary}>200+</Text>
            <Text color={colors.textMuted}>Courses Available</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color={colors.primary}>100+</Text>
            <Text color={colors.textMuted}>Expert Instructors</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color={colors.primary}>4.8</Text>
            <Text color={colors.textMuted}>Average Rating</Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default About
