import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { testimonialService } from '@/services/testimonialService'
import { useThemeContext } from '@/context/ThemeContext'
import TestimonialCard from '@/components/common/TestimonialCard'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const { colors } = useThemeContext()

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialService.getAll()
        setTestimonials(response.data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <Box py={16} px={4}>
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={colors.text}>What Our Students Say</Text>
          <Text color={colors.textMuted} maxW="600px">
            Hear from our successful students who have transformed their careers with EduQuest
          </Text>
        </VStack>

        {loading ? (
          <Text color={colors.text}>Loading testimonials...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default Testimonials
