import { BellIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import FullscreenLoader from "@components/FullscreenLoader";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
    const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
    const [user, setUser] = useState({ name: "", role: "" });
    const [notificationCount, setNotificationCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Glassy effect styles
    const glassyBg = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)");
    const hoverBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)");

    const loadData = async () => {
        const clientsUrl = `${import.meta.env.VITE_BACKEND_URL}/clients`;
        const userUrl = `${import.meta.env.VITE_BACKEND_URL}/currentUser`;
        const notificationsUrl = `${import.meta.env.VITE_BACKEND_URL}/notifications`;

        try {
            const [clientsResponse, userResponse, notificationsResponse] = await Promise.all([
                axios.get(clientsUrl),
                axios.get(userUrl),
                axios.get(notificationsUrl),
            ]);

            setClients(clientsResponse.data);
            setUser(userResponse.data);
            setNotificationCount(notificationsResponse.data.count);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (isLoading) {
        return <FullscreenLoader />;
    }

    return (
        <Flex direction="column" bg="linear-gradient(to left, #A1FFCE, #86fde8)" p="4">
            <Flex justifyContent="space-between" alignItems="center">
                {/* Left Side: Clients List */}
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        bg={glassyBg}
                        borderRadius="10px"
                        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                        backdropFilter="blur(10px)"
                        _hover={{ bg: hoverBg, boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)" }}
                    >
                        Select Client
                    </MenuButton>
                    <MenuList>
                        {clients.map((client) => (
                            <MenuItem key={client.id}>{client.name}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>

                {/* Right Side: User Info and Notifications */}
                <Flex alignItems="center">
                    {/* Avatar and User */}
                    <Flex alignItems="center" mr="2">
                        <Avatar name={user.name} mr="1" />
                        <Flex direction="column" alignItems="flex-start" ml="1">
                            <Text noOfLines={1} fontWeight="bold">
                                {user.name}
                            </Text>
                            <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                {user.role}
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Settings Menu */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            variant="ghost"
                            rightIcon={<ChevronDownIcon />}
                            _hover={{
                                bg: hoverBg,
                                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                            }}
                        >
                            <SettingsIcon w={5} h={5} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Notifications */}
                    <Flex position="relative" alignItems="center" mr="4">
                        <IconButton
                            icon={<BellIcon w={6} h={6} />}
                            variant="ghost"
                            aria-label="Notifications"
                            _hover={{
                                bg: hoverBg,
                                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                            }}
                        />
                        {notificationCount > 0 && (
                            <Box
                                position="absolute"
                                top="-1"
                                right="1"
                                px={1}
                                fontSize="xs"
                                fontWeight="bold"
                                color="white"
                                bg="red.500"
                                borderRadius="full"
                            >
                                {notificationCount}
                            </Box>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;
