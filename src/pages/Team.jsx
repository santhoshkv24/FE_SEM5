import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { teamService } from '@/services/teamService'
import { useThemeContext } from '@/context/ThemeContext'
import TeamCard from '@/components/common/TeamCard'

const Team = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const { colors } = useThemeContext()

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await teamService.getAll()
        setTeam(response.data)
      } catch (error) {
        console.error('Error fetching team:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  return (
    <Box py={16} px={4}>
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={colors.text}>Meet Our Team</Text>
          <Text color={colors.textSubtle} maxW="600px">
            Our dedicated team of experts is here to help you succeed in your learning journey
          </Text>
        </VStack>

        {loading ? (
          <Text color={colors.text}>Loading team...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="100%">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default Team
