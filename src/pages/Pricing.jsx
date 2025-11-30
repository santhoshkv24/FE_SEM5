import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { pricingService } from '@/services/pricingService'
import { useThemeContext } from '@/context/ThemeContext'
import PricingCard from '@/components/common/PricingCard'

const Pricing = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { colors } = useThemeContext()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await pricingService.getAll()
        setPlans(response.data)
      } catch (error) {
        console.error('Error fetching pricing:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  return (
    <Box py={16} px={4}>
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={colors.text}>Choose Your Plan</Text>
          <Text color={colors.textSubtle} maxW="600px">
            Select the perfect plan for your learning needs. Upgrade or downgrade anytime.
          </Text>
        </VStack>

        {loading ? (
          <Text color={colors.text}>Loading pricing plans...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%" maxW="900px" alignItems="center">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </SimpleGrid>
        )}

        <VStack mt={8} textAlign="center" gap={2}>
          <Text fontWeight="bold" color={colors.text}>All plans include:</Text>
          <Text color={colors.textSubtle}>30-day money-back guarantee • Cancel anytime • Lifetime access to purchased courses</Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Pricing
