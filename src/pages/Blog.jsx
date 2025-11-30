import { Box, Text, VStack, SimpleGrid, Input, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { blogService } from '@/services/blogService'
import { useAuth } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import BlogCard from '@/components/common/BlogCard'
import BlogForm from '@/components/forms/BlogForm'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { isAdmin } = useAuth()
  const { colors } = useThemeContext()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAll()
      setBlogs(response.data)
      setFilteredBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBlogs(filtered)
    } else {
      setFilteredBlogs(blogs)
    }
  }, [searchTerm, blogs])

  const handleBlogAdded = () => {
    setShowForm(false)
    fetchBlogs()
  }

  return (
    <Box py={16} px={4}>
      <VStack maxW="1200px" mx="auto" gap={8}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={colors.text}>Our Blog</Text>
          <Text color={colors.textSubtle} maxW="600px">
            Stay updated with the latest insights, tips, and trends in education and technology
          </Text>
        </VStack>

        <Input
          placeholder="Search articles..."
          maxW="400px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          px={4}
          py={3}
        />

        {isAdmin && (
          <Button colorPalette="teal" onClick={() => setShowForm(!showForm)} px={4} py={2}>
            {showForm ? 'Cancel' : 'Add New Article'}
          </Button>
        )}

        {showForm && <BlogForm onSuccess={handleBlogAdded} />}

        {loading ? (
          <Text color={colors.text}>Loading articles...</Text>
        ) : filteredBlogs.length === 0 ? (
          <Text color={colors.textSubtle}>No articles found</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default Blog
