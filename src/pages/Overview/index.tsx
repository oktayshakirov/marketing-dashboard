import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Card from "@components/Card";
import { useClient } from "@contexts/useClientContext";
import { useEffect, useState } from "react";
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Overview = () => {
    const { selectedClient } = useClient();
    const [clientMessage, setClientMessage] = useState("");
    const [clientDescription, setClientDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (selectedClient) {
            setClientMessage(`You are currently reviewing the data for ${selectedClient.name}.`);
            setClientDescription(selectedClient.description || "No description available.");
            setPhoneNumber(selectedClient.phoneNumber || null);
            setEmail(selectedClient.email || null);
        } else {
            setClientMessage("Select a client to view their data.");
            setClientDescription("");
            setPhoneNumber(null);
            setEmail(null);
        }
    }, [selectedClient]);

    return (
        <Card>
            <VStack spacing={4} align="start">
                <Text fontSize="2xl">{clientMessage}</Text>
                <Text fontSize="md">{clientDescription}</Text>

                {/* Client Contact Information */}
                {phoneNumber || email ? (
                    <Box borderWidth="1px" borderRadius="lg" p={3} w="full">
                        <Text fontWeight="bold">Contact Information:</Text>
                        {phoneNumber && <Text>Phone: {phoneNumber}</Text>}
                        {email && <Text>Email: {email}</Text>}
                    </Box>
                ) : null}

                {/* Placeholder for Client Images */}
                <HStack spacing="4">
                    {/* Adjust spacing as needed */}
                    <Image src="https://via.placeholder.com/250" alt="Client Logo" />
                    <Image src="https://via.placeholder.com/250" alt="Client Logo" />
                    <Image src="https://via.placeholder.com/250" alt="Client Logo" />
                </HStack>

                {/* Social Media and Website Links */}
                <HStack spacing={3}>
                    <Button leftIcon={<FaGlobe />} colorScheme="blue">
                        Website
                    </Button>
                    <Button leftIcon={<FaFacebook />} colorScheme="facebook">
                        Facebook
                    </Button>
                    <Button leftIcon={<FaTwitter />} colorScheme="twitter">
                        Twitter
                    </Button>
                    <Button leftIcon={<FaInstagram />} colorScheme="pink">
                        Instagram
                    </Button>
                    <Button leftIcon={<FaLinkedin />} colorScheme="linkedin">
                        LinkedIn
                    </Button>
                    <Button leftIcon={<FaYoutube />} colorScheme="red">
                        YouTube
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
};

export default Overview;
