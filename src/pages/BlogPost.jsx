import { Box, Text, VStack, Image, Badge, Button, HStack } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { blogService } from '@/services/blogService'
import { useAuth } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import BlogForm from '@/components/forms/BlogForm'

const BlogPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const { isAdmin } = useAuth()
  const { colors } = useThemeContext()

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await blogService.getById(id)
      setBlog(response.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await blogService.delete(id)
        navigate('/blog')
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const handleUpdate = () => {
    setIsEditing(false)
    fetchBlog()
  }

  if (loading) {
    return (
      <Box py={16} px={4} textAlign="center">
        <Text color={colors.text}>Loading article...</Text>
      </Box>
    )
  }

  if (!blog) {
    return (
      <Box py={16} px={4} textAlign="center">
        <Text color={colors.text}>Article not found</Text>
      </Box>
    )
  }

  return (
    <Box py={16} px={4}>
      <Box maxW="800px" mx="auto">
        {isEditing ? (
          <VStack gap={4}>
            <Text fontSize="2xl" fontWeight="bold" color={colors.text}>Edit Article</Text>
            <BlogForm blog={blog} onSuccess={handleUpdate} />
            <Button onClick={() => setIsEditing(false)} px={4} py={2}>Cancel</Button>
          </VStack>
        ) : (
          <VStack align="start" gap={6}>
            <Image
              src={blog.image}
              alt={blog.title}
              borderRadius="lg"
              w="100%"
              h="400px"
              objectFit="cover"
            />
            <Badge colorPalette="purple" fontSize="sm">{blog.category}</Badge>
            <Text fontSize="3xl" fontWeight="bold" color={colors.text}>{blog.title}</Text>
            <Text color={colors.textSubtle}>
              By {blog.author} • {new Date(blog.date).toLocaleDateString()}
            </Text>
            <Text color={colors.text} lineHeight="tall" fontSize="lg" whiteSpace="pre-wrap">
              {blog.content}
            </Text>
            {isAdmin && (
              <HStack gap={4}>
                <Button colorPalette="yellow" onClick={() => setIsEditing(true)} px={4} py={2}>
                  Edit
                </Button>
                <Button colorPalette="red" onClick={handleDelete} px={4} py={2}>
                  Delete
                </Button>
              </HStack>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  )
}

export default BlogPost
