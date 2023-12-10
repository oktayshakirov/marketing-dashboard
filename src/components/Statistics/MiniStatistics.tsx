import Card from "@/components/Card";
import { Box, Flex, Stat, StatHelpText, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";
import { cloneElement, useEffect, useState } from "react";

type StatisticsData = {
    title: string;
    amount: string;
    percentage: number;
};

interface MiniStatisticsProps {
    keyName: string;
    icon: JSX.Element;
}

const MiniStatistics: React.FC<MiniStatisticsProps> = ({ keyName, icon }) => {
    const [data, setData] = useState<StatisticsData>({ title: "", amount: "", percentage: 0 });
    const iconTeal = useColorModeValue("teal.300", "teal.300");
    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        fetch("/fake/statistics")
            .then((response) => response.json())
            .then((allData) => {
                if (allData[keyName]) {
                    setData(allData[keyName]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [keyName]);

    const iconWithSize = cloneElement(icon, { h: "24px", w: "24px" });

    return (
        <Card width={{ base: "100%", md: "23%" }}>
            <Flex flexDirection="row" align="center" justify="center" p="1rem">
                <Stat me="auto">
                    <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                        {data.title}
                    </StatLabel>
                    <Flex>
                        <StatNumber fontSize="lg" color={textColor}>
                            {data.amount}
                        </StatNumber>
                        <StatHelpText
                            m="1px"
                            color={data.percentage > 0 ? "green.400" : "red.400"}
                            fontWeight="bold"
                            ps="5px"
                            fontSize="md"
                        >
                            {data.percentage > 0 ? `+${data.percentage}%` : `${data.percentage}%`}
                        </StatHelpText>
                    </Flex>
                </Stat>
                <Box
                    h={"45px"}
                    w={"45px"}
                    bg={iconTeal}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {iconWithSize}
                </Box>
            </Flex>
        </Card>
    );
};

export default MiniStatistics;
