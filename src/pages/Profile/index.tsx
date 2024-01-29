import Card from "@/components/Card";
import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import FullscreenLoader from "@components/FullscreenLoader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface User {
    id: number;
    name: string;
    role: string;
    email: string;
    tel: string;
    createdAt: string;
    avatar: string;
    location: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        const usersUrl = `${import.meta.env.VITE_BACKEND_URL}/users`;

        try {
            const response = await axios.get(usersUrl);
            const currentUserId = 1; // Current user ID
            const currentUser = response.data.find((user: User) => user.id === currentUserId);

            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error("Current user not found in the list");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return <FullscreenLoader />;
    }

    return (
        <Card>
            <Box p={5}>
                <Flex direction="column" align="start">
                    <Text fontSize="2xl" mb={4}>
                        My Profile:
                    </Text>
                    {user && (
                        <Flex alignItems="center">
                            <Flex alignItems="center" mr="2">
                                <Avatar name={user.name} src={user.avatar} size="md" />
                                <Flex direction="column" alignItems="flex-start" ml="1">
                                    <Text noOfLines={1} fontWeight="bold">
                                        {user.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                        {user.role}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}

                    {user && (
                        <Box mt={4}>
                            <Stack spacing={2} direction="row" align="center">
                                <Text>Email: {user.email}</Text>
                            </Stack>
                            <Stack spacing={2} direction="row" align="center">
                                <Text>Phone: {user.tel}</Text>
                            </Stack>
                            <Stack spacing={2} direction="row" align="center">
                                <Text>Location: {user.location}</Text>
                            </Stack>
                            <Stack spacing={2} direction="row" align="center">
                                <Text>Joined: {user.createdAt}</Text>
                            </Stack>
                        </Box>
                    )}

                    <HStack>
                        <Link as={RouterLink} to="/settings">
                            <Button colorScheme="blue" mt={6}>
                                <SettingsIcon mr={2} />
                                Settings
                            </Button>
                        </Link>
                        <Link as={RouterLink} to="/signout">
                            <Button colorScheme="red" mt={6}>
                                <CloseIcon mr={2} />
                                Sign Out
                            </Button>
                        </Link>
                    </HStack>
                </Flex>
            </Box>
        </Card>
    );
};

export default Profile;
