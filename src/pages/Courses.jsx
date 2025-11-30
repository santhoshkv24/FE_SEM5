import { Box, Text, VStack, SimpleGrid, Input, HStack, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { courseService } from '@/services/courseService'
import { useAuth } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import CourseCard from '@/components/common/CourseCard'
import CourseForm from '@/components/forms/CourseForm'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const { isAdmin } = useAuth()
  const { colors } = useThemeContext()

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Mobile Development', 'Marketing', 'Cloud Computing']

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll()
      setCourses(response.data)
      setFilteredCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = courses
    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedCategory !== 'All') {
      result = result.filter((course) => course.category === selectedCategory)
    }
    setFilteredCourses(result)
  }, [searchTerm, selectedCategory, courses])

  const handleCourseAdded = () => {
    setShowForm(false)
    fetchCourses()
  }

  return (
    <Box py={16} px={4}>
      <VStack maxW="1200px" mx="auto" gap={8}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={colors.text}>All Courses</Text>
          <Text color={colors.textMuted} maxW="600px">
            Explore our wide range of courses and start your learning journey
          </Text>
        </VStack>

        <HStack w="100%" gap={4} flexWrap="wrap" justify="center">
          <Input
            placeholder="Search courses..."
            maxW="300px"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            px={4}
            py={3}
          />
          <HStack gap={2} flexWrap="wrap" justify="center">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'solid' : 'outline'}
                colorPalette="teal"
                onClick={() => setSelectedCategory(category)}
                px={4}
                py={2}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </HStack>

        {isAdmin && (
          <Button colorPalette="teal" onClick={() => setShowForm(!showForm)} px={4} py={2}>
            {showForm ? 'Cancel' : 'Add New Course'}
          </Button>
        )}

        {showForm && <CourseForm onSuccess={handleCourseAdded} />}

        {loading ? (
          <Text color={colors.text}>Loading courses...</Text>
        ) : filteredCourses.length === 0 ? (
          <Text color={colors.textSubtle}>No courses found</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default Courses
