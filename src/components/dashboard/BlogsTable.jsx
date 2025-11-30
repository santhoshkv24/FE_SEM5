import { Box, Table, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { blogService } from '@/services/blogService'
import { useThemeContext } from '@/context/ThemeContext'
import { Toaster, toaster } from '@/components/ui/toaster'
import BlogForm from '@/components/forms/BlogForm'

const BlogsTable = ({ blogs, onRefresh }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const { colors } = useThemeContext()

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await blogService.delete(id)
        toaster.create({ title: 'Article deleted successfully!', type: 'success' })
        onRefresh()
      } catch (error) {
        toaster.create({ title: 'Error deleting article', type: 'error' })
      }
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setShowForm(true)
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditingBlog(null)
    onRefresh()
  }

  return (
    <VStack align="stretch" gap={4}>
      <Toaster />
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold" color={colors.text}>Blog Management</Text>
        <Button colorPalette="green" onClick={() => { setEditingBlog(null); setShowForm(!showForm) }} px={4} py={2}>
          {showForm ? 'Cancel' : 'Add New Article'}
        </Button>
      </HStack>

      {showForm && (
        <Box display="flex" justifyContent="center">
          <BlogForm blog={editingBlog} onSuccess={handleSuccess} />
        </Box>
      )}

      <Box bg={colors.cardBg} borderRadius="lg" shadow="sm" overflow="hidden">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Title</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Author</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Category</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Date</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3} color={colors.text}>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {blogs.map((blog) => (
              <Table.Row key={blog.id}>
                <Table.Cell px={4} py={3} color={colors.text}>{blog.title}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{blog.author}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{blog.category}</Table.Cell>
                <Table.Cell px={4} py={3} color={colors.text}>{new Date(blog.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell px={4} py={3}>
                  <HStack gap={2}>
                    <Button size="sm" colorPalette="yellow" onClick={() => handleEdit(blog)} px={3} py={1}>
                      Edit
                    </Button>
                    <Button size="sm" colorPalette="red" onClick={() => handleDelete(blog.id)} px={3} py={1}>
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

export default BlogsTable
