import { Box, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { useThemeContext } from '@/context/ThemeContext'

const PricingCard = ({ plan }) => {
  const isPopular = plan.popular
  const { colors } = useThemeContext()

  return (
    <Box
      bg={isPopular ? 'teal.600' : colors.cardBg}
      color={isPopular ? 'white' : colors.text}
      borderRadius="lg"
      shadow="lg"
      p={6}
      position="relative"
      transform={isPopular ? 'scale(1.05)' : 'none'}
      _hover={{ shadow: 'xl' }}
      transition="all 0.2s"
    >
      {isPopular && (
        <Badge colorPalette="orange" position="absolute" top={-3} right={4} px={3} py={1}>
          Most Popular
        </Badge>
      )}
      <VStack gap={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {plan.name}
        </Text>
        <HStack justify="center" align="baseline">
          <Text fontSize="4xl" fontWeight="bold">
            Rs. {plan.price}
          </Text>
          <Text fontSize="sm" color={isPopular ? 'teal.100' : colors.textSubtle}>
            /{plan.period}
          </Text>
        </HStack>
        <VStack align="start" gap={3} py={4}>
          {plan.features.map((feature, index) => (
            <HStack key={index}>
              <FiCheck color={isPopular ? '#81E6D9' : '#319795'} />
              <Text fontSize="sm">{feature}</Text>
            </HStack>
          ))}
        </VStack>
        <Button
          colorPalette={isPopular ? 'orange' : 'teal'}
          variant={isPopular ? 'solid' : 'outline'}
          w="full"
          px={4}
          py={2}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  )
}

export default PricingCard
