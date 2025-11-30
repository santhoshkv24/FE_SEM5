import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { useThemeContext } from '@/context/ThemeContext'

const TeamCard = ({ member }) => {
  const { colors } = useThemeContext()

  return (
    <Box bg={colors.cardBg} borderRadius="lg" overflow="hidden" shadow="md" textAlign="center" p={6} _hover={{ shadow: 'lg' }} transition="all 0.2s">
      <Image
        src={member.image}
        alt={member.name}
        w="120px"
        h="120px"
        borderRadius="full"
        mx="auto"
        objectFit="cover"
        mb={4}
      />
      <VStack gap={1}>
        <Text fontWeight="bold" fontSize="lg" color={colors.text}>
          {member.name}
        </Text>
        <Text color="teal.600" fontSize="sm" fontWeight="medium">
          {member.role}
        </Text>
        <Text color={colors.textSubtle} fontSize="sm" mt={2}>
          {member.bio}
        </Text>
      </VStack>
    </Box>
  )
}

export default TeamCard

