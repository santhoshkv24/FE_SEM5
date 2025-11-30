import { Box, Table, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { courseService } from '@/services/courseService'
import { useThemeContext } from '@/context/ThemeContext'
import { Toaster, toaster } from '@/components/ui/toaster'
import CourseForm from '@/components/forms/CourseForm'

const CoursesTable = ({ courses, onRefresh }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const { colors } = useThemeContext()

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.delete(id)
        toaster.create({ title: 'Course deleted successfully!', type: 'success' })
        onRefresh()
      } catch (error) {
        toaster.create({ title: 'Error deleting course', type: 'error' })
      }
    }
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setShowForm(true)
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditingCourse(null)
    onRefresh()
  }

  return (
    <VStack align="stretch" gap={4}>
      <Toaster />
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold" color={colors.text}>Courses Management</Text>
        <Button colorPalette="green" onClick={() => { setEditingCourse(null); setShowForm(!showForm) }} px={4} py={2}>
          {showForm ? 'Cancel' : 'Add New Course'}
        </Button>
      </HStack>

      {showForm && (
        <Box display="flex" justifyContent="center">
          <CourseForm course={editingCourse} onSuccess={handleSuccess} />
        </Box>
      )}

      <Box bg={colors.cardBg} borderRadius="lg" shadow="sm" overflow="hidden">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Title</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Instructor</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Category</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Price</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Enrolled</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {courses.map((course) => (
              <Table.Row key={course.id}>
                <Table.Cell px={4} py={3} color={colors.text}>{course.title}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{course.instructor}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{course.category}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>${course.price}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{course.enrolled}</Table.Cell>
                <Table.Cell px={4} py={3}>
                  <HStack gap={2}>
                    <Button size="sm" colorPalette="yellow" onClick={() => handleEdit(course)} px={3} py={1}>
                      Edit
                    </Button>
                    <Button size="sm" colorPalette="red" onClick={() => handleDelete(course.id)} px={3} py={1}>
                      Delete
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </VStack>
  )
}

export default CoursesTable
