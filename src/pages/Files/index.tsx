import Card from "@/components/Card";
import { Box, Heading, Icon, Link, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { FiDownload, FiFile, FiFolder } from "react-icons/fi";

const Files: React.FC = () => {
    const fakeFiles = [
        { name: "Marketing_Plan.pdf", link: "https://drive.google.com/file/d/123" },
        { name: "Budget_Report.xlsx", link: "https://drive.google.com/file/d/456" },
        { name: "Design_Mockups.zip", link: "https://drive.google.com/file/d/789" },
    ];

    return (
        <Card>
            <Box p={4}>
                <Heading mb={4}>
                    <Icon as={FiFolder} mr={2} /> Client File Sharing
                </Heading>
                <Text mb={4}>Access shared files and resources here:</Text>
                <List spacing={3}>
                    {fakeFiles.map((file, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                            <Icon as={FiFile} mr={2} />
                            <Link href={file.link} isExternal color="blue.500">
                                {file.name}
                            </Link>
                            <Icon as={FiDownload} ml={2} color="green.500" />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Card>
    );
};

export default Files;
