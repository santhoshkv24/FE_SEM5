import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { useThemeContext } from '@/context/ThemeContext'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Courses from '@/pages/Courses'
import CourseDetail from '@/pages/CourseDetail'
import Team from '@/pages/Team'
import Testimonials from '@/pages/Testimonials'
import Pricing from '@/pages/Pricing'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import NotFound from '@/pages/NotFound'
import ProtectedRoute from '@/components/common/ProtectedRoute'

function App() {
  const { colors } = useThemeContext()

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={colors.bg}>
      <Navbar />
      <Box as="main" flex="1" bg={colors.bgAlt}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
