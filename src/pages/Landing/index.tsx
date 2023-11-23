import { Box, Flex, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import { BarChart, LineChart } from "@components/Charts";

const LandingPage: React.FC = () => {
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

            <Grid
                templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="24px"
                mb="40px"
            >
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Quarterly Revenue
                    </Text>
                    <BarChart />
                </Box>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Annual Performance
                    </Text>
                    <LineChart />
                </Box>
            </Grid>
        </Flex>
    );
};

export default LandingPage;
