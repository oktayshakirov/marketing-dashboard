import Card from "@/components/Card";
import { CheckCircleIcon, SpinnerIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { useEffect, useRef, useState } from "react";

interface CampaignData {
    name: string;
    progress: number;
    status: string;
    todos: string[];
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Completed":
            return <CheckCircleIcon color="green.500" />;
        case "Planning":
            return <TimeIcon color="gray.500" />;
        default:
            return <SpinnerIcon color="gray.500" />;
    }
};

const CampaignsTable: React.FC = () => {
    const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const detailsRefs = useRef<Array<HTMLTableRowElement | null>>([]);
    const { selectedClient } = useClient();

    useEffect(() => {
        if (selectedClient && selectedClient.id) {
            fetch("/fake/campaigns")
                .then((response) => response.json())
                .then((allCampaigns) => {
                    const clientCampaigns = allCampaigns[selectedClient.id]?.campaigns || [];
                    setCampaigns(clientCampaigns);
                    if (clientCampaigns.length > 0) {
                        setSelectedCampaign(0);
                    }
                })
                .catch((err) => {
                    console.error("Failed to load campaign data:", err);
                    setError("Failed to load campaign data.");
                });
        } else {
            setCampaigns([]);
        }
    }, [selectedClient]);

    const handleViewDetails = (index: number) => {
        setSelectedCampaign(index === selectedCampaign ? null : index);
        if (index !== selectedCampaign) {
            setTimeout(() => {
                detailsRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    useEffect(() => {
        if (selectedCampaign !== null) {
            detailsRefs.current[selectedCampaign]?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedCampaign]);

    if (error) {
        return <Box>Error: {error}</Box>;
    }

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Campaign Name</Th>
                            <Th>Progress</Th>
                            <Th>Status</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campaigns.map((campaign, index) => (
                            <React.Fragment key={index}>
                                <Tr>
                                    <Td>{campaign.name}</Td>
                                    <Td>
                                        <Progress
                                            value={campaign.progress}
                                            size="sm"
                                            colorScheme={campaign.progress > 50 ? "green" : "red"}
                                        />
                                    </Td>
                                    <Td>
                                        <Flex alignItems="center">
                                            {getStatusIcon(campaign.status)}
                                            <Text ml={2}>{campaign.status}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text
                                            color="blue.500"
                                            cursor="pointer"
                                            onClick={() => handleViewDetails(index)}
                                        >
                                            {selectedCampaign === index ? "Hide Details" : "View Details"}
                                        </Text>
                                    </Td>
                                </Tr>
                                {selectedCampaign === index && (
                                    <Tr ref={(el) => (detailsRefs.current[index] = el)}>
                                        <Td colSpan={5}>
                                            <VStack align="start" spacing={2}>
                                                {campaign.todos.map((todo, idx) => (
                                                    <Checkbox key={idx}>{todo}</Checkbox>
                                                ))}
                                            </VStack>
                                        </Td>
                                    </Tr>
                                )}
                            </React.Fragment>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
};

export default CampaignsTable;
