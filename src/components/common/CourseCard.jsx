import { Box, Image, Text, HStack, Badge, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiClock, FiUsers, FiStar } from 'react-icons/fi'
import { useThemeContext } from '@/context/ThemeContext'

const CourseCard = ({ course }) => {
  const { colors } = useThemeContext()
  
  return (
    <Box bg={colors.cardBg} borderRadius="lg" overflow="hidden" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.2s">
      <Image src={course.image} alt={course.title} h="180px" w="100%" objectFit="cover" />
      <Box p={4}>
        <Badge colorPalette="teal" mb={2} px={2}>{course.category}</Badge>
        <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color={colors.text}>
          {course.title}
        </Text>
        <Text color={colors.textMuted} fontSize="sm" mb={3} noOfLines={2}>
          {course.description}
        </Text>
        <HStack gap={4} mb={3} color={colors.textSubtle} fontSize="sm">
          <HStack>
            <FiClock />
            <Text>{course.duration}</Text>
          </HStack>
          <HStack>
            <FiUsers />
            <Text>{course.enrolled}</Text>
          </HStack>
          <HStack>
            <FiStar />
            <Text>{course.rating}</Text>
          </HStack>
        </HStack>
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl" color={colors.primary}>
            Rs. {course.price}/-
          </Text>
          <Link to={`/courses/${course.id}`}>
            <Button size="sm" colorPalette="teal" px={4} py={2}>
              View Details
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  )
}

export default CourseCard
