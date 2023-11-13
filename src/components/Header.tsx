import { BellIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

const Header = () => {
    const clients = ["Client 1", "Client 2", "Client 3"];
    const user = { name: "Oktay Shakirov", role: "Admin" };
    const notificationCount = 5;

    return (
        <Flex direction="column" bg="gray.100" p="4">
            <Flex justifyContent="space-between" alignItems="center">
                {/* Clients List */}
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Select Client
                    </MenuButton>
                    <MenuList>
                        {clients.map((client) => (
                            <MenuItem key={client}>{client}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>

                {/* Right Side: User Info and Notifications */}
                <Flex alignItems="center">
                    {/* Avatar and User Info */}
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

                    {/* Settings */}
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <SettingsIcon w={5} h={5} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Notification Icon with Badge */}
                    <IconButton
                        icon={<BellIcon w={6} h={6} />}
                        variant="ghost"
                        aria-label="Notifications"
                        mr="4"
                        position="relative"
                    />
                    {notificationCount > 0 && (
                        <Box
                            position="absolute"
                            top="5"
                            right="9"
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
    );
};

export default Header;
