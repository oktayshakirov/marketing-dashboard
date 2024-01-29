import Card from "@/components/Card";
import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { useEffect, useState } from "react";

interface CampaignData {
    name: string;
    clientId: string;
    progress: number;
    status: string;
    todos: string[];
}

interface StatisticsData {
    title: string;
    amount: string;
}

interface MiniStatisticsProps {
    keyName: string;
    icon: JSX.Element;
}

const CampaignStatistics: React.FC<MiniStatisticsProps> = ({ keyName, icon }) => {
    const [data, setData] = useState<StatisticsData>({ title: "", amount: "" });
    const { selectedClient } = useClient();

    useEffect(() => {
        if (selectedClient && selectedClient.id) {
            fetch("/fake/campaigns")
                .then((response) => response.json())
                .then((allCampaigns) => {
                    const clientCampaigns = allCampaigns[selectedClient.id].campaigns;
                    const calculatedData = calculateStatistics(keyName, clientCampaigns);
                    setData(calculatedData);
                })
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            setData({ title: "", amount: "" });
        }
    }, [keyName, selectedClient]);

    const iconWithSize = React.cloneElement(icon, { h: "30px", w: "30px" });

    return (
        <Card width={{ base: "100%", md: "23%" }}>
            <Flex flexDirection="row" align="center" justify="center" p="1rem">
                <Stat me="auto">
                    <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                        {data.title}
                    </StatLabel>
                    <StatNumber fontSize="lg" color={"gray.700"}>
                        {data.amount}
                    </StatNumber>
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

const calculateStatistics = (keyName: string, campaigns: CampaignData[]): StatisticsData => {
    switch (keyName) {
        case "campaigns": {
            return { title: "Current Campaigns", amount: campaigns.length.toString() };
        }
        case "tasks": {
            const totalTasks = campaigns.reduce((acc, campaign) => acc + campaign.todos.length, 0);
            return { title: "Total Tasks", amount: totalTasks.toString() };
        }
        case "progress": {
            const totalProgress = campaigns.reduce((acc, campaign) => acc + campaign.progress, 0);
            const averageProgress = totalProgress / campaigns.length;
            return { title: "Average Progress", amount: `${averageProgress.toFixed(0)}%` };
        }
        case "time": {
            return { title: "Estimated Time", amount: "25 days" };
        }
        default:
            return { title: "", amount: "" };
    }
};

export default CampaignStatistics;
