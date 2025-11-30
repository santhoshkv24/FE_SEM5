import { Box, Image, Text, Badge, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '@/context/ThemeContext'

const BlogCard = ({ blog }) => {
  const { colors } = useThemeContext()
  
  return (
    <Box bg={colors.cardBg} borderRadius="lg" overflow="hidden" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.2s">
      <Image src={blog.image} alt={blog.title} h="180px" w="100%" objectFit="cover" />
      <Box p={4}>
        <Badge colorPalette="purple" px={4} py={1} mb={2}>{blog.category}</Badge>
        <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color={colors.text}>
          {blog.title}
        </Text>
        <Text color={colors.textMuted} fontSize="sm" mb={3} noOfLines={3}>
          {blog.content}
        </Text>
        <Text color={colors.textSubtle} fontSize="xs" mb={3}>
          By {blog.author}
        </Text>
        <Link to={`/blog/${blog.id}`}>
          <Button size="sm" colorPalette="purple" variant="outline" w="full" px={4} py={2}>
            Read More
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default BlogCard
