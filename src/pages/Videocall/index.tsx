import Card from "@/components/Card";
import { Box, Button, Divider, Heading, Icon, Link, Stat, StatLabel, StatNumber, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { MdVideoCall } from "react-icons/md";

const Videocall: React.FC = () => {
    const meetLink = "https://meet.google.com/new";
    const scheduledCallsCount = 2;

    return (
        <Card>
            <Box textAlign="center" p={4}>
                <Icon as={MdVideoCall} w={20} h={20} color="green.500" mb={4} />
                <Heading as="h2" size="xl" mb={4}>
                    Team Video Call
                </Heading>

                <Stat mb={10}>
                    <StatLabel>Scheduled Calls</StatLabel>
                    <StatNumber>{scheduledCallsCount}</StatNumber>
                </Stat>

                {scheduledCallsCount > 0 && (
                    <VStack mb={10} alignItems="center">
                        <Divider my={2} />
                        <Text fontSize="lg">
                            <b>Call Topic:</b> Marketing Expenses
                        </Text>
                        <Text fontSize="lg">
                            <b>Scheduled Time:</b> Today, 3:00 PM
                        </Text>

                        <Divider my={2} />

                        <Text fontSize="lg">
                            <b>Call Topic:</b> Design Planning
                        </Text>
                        <Text fontSize="lg">
                            <b>Scheduled Time:</b> Tomorrow, 6:00 PM
                        </Text>

                        <Divider my={2} />

                        <Button colorScheme="green" size="lg" mt={10} onClick={() => window.open(meetLink, "_blank")}>
                            Join Google Meet
                        </Button>
                    </VStack>
                )}

                <Text fontSize="lg" mb={4}>
                    Join the scheduled video call with our team to discuss project updates and collaborate in real-time.
                </Text>

                <Divider my={4} />

                <Text mt={4}>
                    Need to schedule a new meeting?{" "}
                    <Link href="https://calendar.google.com/" isExternal color="green.500">
                        Create an event
                    </Link>{" "}
                    on Google Calendar.
                </Text>
            </Box>
        </Card>
    );
};

export default Videocall;
