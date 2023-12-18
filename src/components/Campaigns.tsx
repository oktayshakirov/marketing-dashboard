import Card from "@/components/Card";
import { CheckCircleIcon, SpinnerIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const campaignsData = [
    {
        name: "Summer Sale",
        client: "ABC Corp",
        progress: 75,
        status: "Ongoing",
        todos: [
            "Design new banners",
            "Update product listings",
            "Email campaign setup",
            "Social media promotion",
            "Finalize campaign budget",
        ],
    },
    {
        name: "Winter Fest",
        client: "XYZ Inc",
        progress: 40,
        status: "Planning",
        todos: [
            "Initial planning",
            "Budget allocation",
            "Hire additional staff",
            "Market research",
            "Create promotional content",
        ],
    },
    {
        name: "Spring Launch",
        client: "123 Retail",
        progress: 60,
        status: "Ongoing",
        todos: [
            "Product lineup finalization",
            "Landing page development",
            "Partnership outreach",
            "Inventory check",
            "Launch event planning",
        ],
    },
    {
        name: "Back to School",
        client: "Education Ltd",
        progress: 90,
        status: "Completed",
        todos: [
            "School supplies stock",
            "Advertising to educational institutions",
            "Discount pricing setup",
            "Staff training for sales",
            "Post-campaign analysis",
        ],
    },
    {
        name: "Black Friday",
        client: "Marketplace",
        progress: 30,
        status: "Planning",
        todos: [
            "Early bird deals setup",
            "Website capacity testing",
            "Hiring seasonal employees",
            "Collaborations with influencers",
            "Email marketing campaigns",
        ],
    },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Completed":
            return <CheckCircleIcon color="green.500" />;
        case "Planning":
            return <TimeIcon color="black.500" />;
        default:
            return <SpinnerIcon color="black.500" />;
    }
};

const CampaignsTable: React.FC = () => {
    const [selectedCampaign, setSelectedCampaign] = useState<number | null>(0);
    const detailsRefs = useRef<Array<HTMLTableRowElement | null>>([]);

    const handleViewDetails = (index: number) => {
        setSelectedCampaign(index === selectedCampaign ? null : index);
        if (index !== selectedCampaign) {
            setTimeout(() => {
                detailsRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    useEffect(() => {
        detailsRefs.current[0]?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Campaign Name</Th>
                            <Th>Client</Th>
                            <Th>Progress</Th>
                            <Th>Status</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campaignsData.map((campaign, index) => (
                            <React.Fragment key={index}>
                                <Tr>
                                    <Td>{campaign.name}</Td>
                                    <Td>{campaign.client}</Td>
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
