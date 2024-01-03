import { Text } from "@chakra-ui/react";
import Card from "@components/Card";
import { useClient } from "@contexts/useClientContext";
import { useEffect, useState } from "react";

const Overview = () => {
    const { selectedClient } = useClient();
    const [clientMessage, setClientMessage] = useState("");
    const [clientDescription, setClientDescription] = useState("");

    useEffect(() => {
        if (selectedClient) {
            setClientMessage(`You are currently reviewing the data for ${selectedClient.name}.`);
            setClientDescription(selectedClient.description || "No description available.");
        } else {
            setClientMessage("Select a client to view their data.");
            setClientDescription("");
        }
    }, [selectedClient]);

    return (
        <Card>
            <Text fontSize="xl" mb={4}>
                {clientMessage}
            </Text>
            <Text fontSize="md">{clientDescription}</Text>
        </Card>
    );
};

export default Overview;
