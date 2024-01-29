import Card from "@/components/Card";
import { Box, Flex, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { cloneElement, useEffect, useState } from "react";
import CountUp from "react-countup";

type StatisticsData = {
    title: string;
    amount: number;
    percentage: number;
};

interface MiniStatisticsProps {
    keyName: string;
    icon: JSX.Element;
    prefix?: string;
    suffix?: string;
}

const MiniStatistics: React.FC<MiniStatisticsProps> = ({ keyName, icon, prefix, suffix }) => {
    const [data, setData] = useState<StatisticsData>({ title: "", amount: 0, percentage: 0 });
    const { selectedClient } = useClient();

    useEffect(() => {
        if (selectedClient) {
            fetch(`/fake/statistics`)
                .then((response) => response.json())
                .then((allData) => {
                    const clientStatistics = allData[selectedClient.id].statistics;
                    if (clientStatistics && clientStatistics[keyName]) {
                        setData(clientStatistics[keyName]);
                    }
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [keyName, selectedClient]);

    const iconWithSize = cloneElement(icon, { h: "30px", w: "30px" });

    const getDecimalCount = (num: number): number => {
        const str = "" + num;
        const index = str.indexOf(".");
        return index >= 0 ? str.length - index - 1 : 0;
    };

    return (
        <Card width={{ base: "100%", md: "23%" }}>
            <Flex flexDirection="row" align="center" justify="center" p="1rem">
                <Stat me="auto">
                    <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                        {data.title}
                    </StatLabel>
                    <Flex>
                        <StatNumber fontSize="lg" color={"gray.700"}>
                            {prefix}
                            <CountUp start={0} end={data.amount} decimals={getDecimalCount(data.amount)} decimal="." />
                            {suffix}
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
                    h={"50px"}
                    w={"50px"}
                    bg={"blackAlpha.100"}
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
