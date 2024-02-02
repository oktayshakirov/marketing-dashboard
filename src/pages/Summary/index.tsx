import Card from "@/components/Card";
import { Box, Divider, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import { useEffect, useState } from "react";

// Interface for the summary data
interface SummaryData {
    id: string;
    title: string;
    description: string;
    requirements: {
        budget: string;
        timeline: string;
        designers: number;
        programmers: number;
        marketingSpecialists: number;
        socialMediaPresence?: string;
        contentCreation?: string;
        videoProduction?: string;
        targetAudienceResearch?: string;
    };
}

const Summary: React.FC = () => {
    const { selectedClient } = useClient();
    const [clientSummary, setClientSummary] = useState<SummaryData | null>(null);

    useEffect(() => {
        if (selectedClient && selectedClient.id) {
            fetch("/fake/summaries")
                .then((response) => response.json())
                .then((allSummaries: SummaryData[]) => {
                    const summary = allSummaries.find((s) => s.id === selectedClient.id) || null;
                    setClientSummary(summary);
                })
                .catch((err) => console.error("Failed to load summary data:", err));
        } else {
            setClientSummary(null);
        }
    }, [selectedClient]);

    return (
        <Card>
            <Box p={4}>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading mb={4}>{clientSummary ? clientSummary.title : "No client selected"}</Heading>
                </Flex>
                <Text fontSize="lg" mb={4}>
                    {clientSummary ? clientSummary.description : "No description available."}
                </Text>
                <Divider my={4} />
                <List spacing={3}>
                    {clientSummary &&
                        clientSummary.requirements &&
                        Object.entries(clientSummary.requirements).map(([key, value], index) => (
                            <ListItem key={index}>
                                <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}
                            </ListItem>
                        ))}
                </List>
            </Box>
        </Card>
    );
};

export default Summary;
