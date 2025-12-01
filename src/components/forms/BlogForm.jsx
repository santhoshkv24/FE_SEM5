import { Box, VStack, Input, Textarea, Button, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { blogService } from '@/services/blogService'
import { useThemeContext } from '@/context/ThemeContext'
import { Toaster, toaster } from '@/components/ui/toaster'

const BlogForm = ({ blog, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    author: blog?.author || '',
    category: blog?.category || '',
    image: blog?.image || ''
  })
  const [loading, setLoading] = useState(false)
  const { colors } = useThemeContext()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (blog) {
        await blogService.update(blog.id, formData)
        toaster.create({ title: 'Article updated successfully!', type: 'success' })
      } else {
        await blogService.create(formData)
        toaster.create({ title: 'Article created successfully!', type: 'success' })
      }
      onSuccess()
    } catch (error) {
      toaster.create({ title: 'Error saving article', type: 'error' })
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
          placeholder="Article Title"
          value={formData.title}
          onChange={handleChange}
          required
          px={4}
          py={3}
        />
        <Textarea
          name="content"
          placeholder="Article Content"
          rows={6}
          value={formData.content}
          onChange={handleChange}
          required
          px={4}
          py={3}
        />
        <SimpleGrid columns={2} gap={4} w="100%">
          <Input
            name="author"
            placeholder="Author Name"
            value={formData.author}
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
          {blog ? 'Update Article' : 'Create Article'}
        </Button>
      </VStack>
    </Box>
  )
}

export default BlogForm
