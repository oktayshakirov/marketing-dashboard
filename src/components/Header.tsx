import { ChevronDownIcon, ExternalLinkIcon, SettingsIcon, ViewIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Button,
    Divider,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import FullscreenLoader from "@components/FullscreenLoader";
import Notifications from "@components/Notifications";
import { useClient } from "@contexts/useClientContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
    const [user, setUser] = useState({ name: "", role: "" });

    const [isLoading, setIsLoading] = useState(true);
    const { selectedClient, setSelectedClient } = useClient();

    const glassyBg = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)");
    const hoverBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)");

    interface User {
        id: number;
        name: string;
        role: string;
    }

    const handleClientSelect = (client: { id: string; name: string }) => {
        setSelectedClient(client);
    };

    const loadData = useCallback(async () => {
        const usersUrl = `${import.meta.env.VITE_BACKEND_URL}/users`;
        const clientsUrl = `${import.meta.env.VITE_BACKEND_URL}/clients`;
        const notificationsUrl = `${import.meta.env.VITE_BACKEND_URL}/notifications`;

        try {
            const [usersResponse, clientsResponse] = await Promise.all([
                axios.get(usersUrl),
                axios.get(clientsUrl),
                axios.get(notificationsUrl),
            ]);

            setClients(clientsResponse.data);
            if (clientsResponse.data.length > 0 && !selectedClient) {
                setSelectedClient(clientsResponse.data[0]);
            }

            const currentUserId = 1;
            const currentUser = usersResponse.data.find((user: User) => user.id === currentUserId);
            if (currentUser) {
                setUser({ name: currentUser.name, role: currentUser.role });
            } else {
                console.error("Current user not found in the list");
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedClient, setSelectedClient]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (isLoading) {
        return <FullscreenLoader />;
    }

    return (
        <Flex direction="column" bg="#f7f8f9" p="4" sx={{ zIndex: 10 }}>
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
                        {selectedClient ? selectedClient.name : "Select Client"}
                    </MenuButton>
                    <MenuList>
                        {clients.map((client) => (
                            <MenuItem key={client.id} onClick={() => handleClientSelect(client)}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

                {/* Right Side: User Info and Notifications */}
                <Flex alignItems="center">
                    {/* Avatar and User */}

                    <Link to="/profile">
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
                    </Link>

                    {/* Settings Menu */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            variant="ghost"
                            rightIcon={<ChevronDownIcon />}
                            _hover={{
                                bg: hoverBg,
                            }}
                        >
                            <SettingsIcon w={5} h={5} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={Link} to="/profile" icon={<ViewIcon />}>
                                Profile
                            </MenuItem>
                            <MenuItem as={Link} to="/settings" icon={<SettingsIcon />}>
                                Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem as={Link} to="/signout" icon={<ExternalLinkIcon />}>
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Notifications */}
                    <Flex position="relative" alignItems="center" mr="4">
                        <Notifications />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;
