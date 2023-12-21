import Card from "@/components/Card";
import { Box, Divider, Heading, Icon, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { MdAttachMoney, MdCampaign, MdWeb } from "react-icons/md";

const Summary: React.FC = () => {
    return (
        <Card>
            <Box p={4}>
                <Heading mb={4}>Wine Enthusiast Campaign: Project Summary</Heading>
                <Text fontSize="lg" mb={4}>
                    A comprehensive project aimed at enhancing the wine enthusiast's experience through innovative
                    marketing strategies and a sophisticated web presence.
                </Text>
                <Divider my={4} />
                <Text fontSize="lg" mb={4}>
                    <b>Client Request:</b> Create a user-centric website and a targeted marketing strategy to increase
                    brand engagement and product knowledge among wine enthusiasts.
                </Text>
                <List spacing={3}>
                    <ListItem>
                        <Icon as={MdAttachMoney} mr={2} />
                        Budget allocated for marketing, web development, and sourcing.
                    </ListItem>
                    <ListItem>
                        <Icon as={MdCampaign} mr={2} />
                        Digital marketing campaigns targeting wine communities.
                    </ListItem>
                    <ListItem>
                        <Icon as={MdWeb} mr={2} />
                        Elegant website design with user-friendly interface and detailed wine information.
                    </ListItem>
                </List>
                {/* Add more detailed points as needed */}
            </Box>
        </Card>
    );
};

export default Summary;
