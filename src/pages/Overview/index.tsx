import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { BarChart, LineChart } from "@components/Charts";

const Overview: React.FC = () => {
    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} align="start">
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px" mb="40px">
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Monthly Sales
                    </Text>
                    <BarChart />
                </Box>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        User Engagement
                    </Text>
                    <LineChart />
                </Box>
            </SimpleGrid>
        </Flex>
    );
};

export default Overview;
