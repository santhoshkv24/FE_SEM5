import { Box, VStack, Input, Textarea, Button, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { courseService } from '@/services/courseService'
import { useThemeContext } from '@/context/ThemeContext'
import { Toaster, toaster } from '@/components/ui/toaster'

const CourseForm = ({ course, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    instructor: course?.instructor || '',
    price: course?.price || '',
    duration: course?.duration || '',
    image: course?.image || '',
    category: course?.category || '',
    enrolled: course?.enrolled || 0,
    rating: course?.rating || 4.5,
  })
  const [loading, setLoading] = useState(false)
  const { colors } = useThemeContext()

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (course) {
        await courseService.update(course.id, formData)
        toaster.create({ title: 'Course updated successfully!', type: 'success' })
      } else {
        await courseService.create(formData)
        toaster.create({ title: 'Course created successfully!', type: 'success' })
      }
      onSuccess()
    } catch (error) {
      toaster.create({ title: 'Error saving course', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} bg={colors.cardBg} p={6} borderRadius="lg" shadow="md" w="100%" maxW="600px">
      <Toaster />
      <VStack gap={4}>
        <Input
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
          px={4}
          py={3}
        />
        <Textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
          px={4}
          py={3}
        />
        <SimpleGrid columns={2} gap={4} w="100%">
          <Input
            name="instructor"
            placeholder="Instructor Name"
            value={formData.instructor}
            onChange={handleChange}
            required
            px={4}
            py={3}
          />
          <Input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            px={4}
            py={3}
          />
        </SimpleGrid>
        <SimpleGrid columns={2} gap={4} w="100%">
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            px={4}
            py={3}
          />
          <Input
            name="duration"
            placeholder="Duration (e.g., 40 hours)"
            value={formData.duration}
            onChange={handleChange}
            required
            px={4}
            py={3}
          />
        </SimpleGrid>
        <Input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          px={4}
          py={3}
        />
        <Button type="submit" colorPalette="teal" w="full" loading={loading} px={4} py={2}>
          {course ? 'Update Course' : 'Create Course'}
        </Button>
      </VStack>
    </Box>
  )
}

export default CourseForm
