import Card from "@/components/Card";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface UserData {
    name: string;
    email: string;
    role: string;
    status: string;
    tel: string;
    createdAt: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [sortedUsers, setSortedUsers] = useState<UserData[]>([]);
    const [sortType, setSortType] = useState<string>("name");
    const [error, setError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>("all");
    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        fetch("/fake/users")
            .then((response) => response.json())
            .then((data: UserData[]) => {
                setUsers(data);
                sortUsers(data, "name");
            })
            .catch((error) => {
                console.error("Failed to load user data:", error);
                setError("Failed to load user data.");
            });
    }, []);

    useEffect(() => {
        sortUsers(users, sortType);
    }, [sortType, users]);

    const sortUsers = (usersArray: UserData[], type: string) => {
        const sortedArray = [...usersArray];
        if (type === "name") {
            sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        } else if (type === "date") {
            sortedArray.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (type === "status") {
            sortedArray.sort((b, a) => a.status.localeCompare(b.status));
        }
        setSortedUsers(sortedArray);
    };

    const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
        const color = status === "online" ? "green.500" : "red.500";
        return (
            <Box display="flex" alignItems="center">
                <Box width="10px" height="10px" borderRadius="50%" bg={color} marginRight="8px" />
                <Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
            </Box>
        );
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(event.target.value);
    };

    const handleTabChange = (index: number) => {
        const roles = ["all", "admin", "account manager", "client"];
        setSelectedRole(roles[index]);
    };

    const filteredUsers = selectedRole === "all" ? sortedUsers : users.filter((user) => user.role === selectedRole);

    if (error) {
        return (
            <Box>
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <Box p="6px 0px 22px 0px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                        Users
                    </Text>
                    <Flex>
                        <Select onChange={handleSortChange} w="200px" mr="4">
                            <option value="name">Sort by Name</option>
                            <option value="status">Sort by Status</option>
                            <option value="date">Sort by Date</option>
                        </Select>
                    </Flex>
                </Flex>
            </Box>
            <Tabs variant="soft-rounded" colorScheme="teal" onChange={handleTabChange}>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Admins</Tab>
                    <Tab>Account Managers</Tab>
                    <Tab>Clients</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr color="gray.400">
                                    <Th color="gray.400"></Th>
                                    <Th color="gray.400">Name</Th>
                                    <Th color="gray.400">Email</Th>
                                    <Th color="gray.400">Role</Th>
                                    <Th color="gray.400">Status</Th>
                                    <Th color="gray.400">Tel</Th>
                                    <Th color="gray.400">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredUsers.map((user, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Avatar name={user.name} size="md" />
                                        </Td>{" "}
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            <StatusIndicator status={user.status} />
                                        </Td>
                                        <Td>{user.tel}</Td>
                                        <Td>
                                            <IconButton aria-label="Edit user" icon={<EditIcon />} size="md" mr="2" />
                                            <IconButton aria-label="Delete user" icon={<DeleteIcon />} size="md" />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr color="gray.400">
                                    <Th color="gray.400"></Th>
                                    <Th color="gray.400">Name</Th>
                                    <Th color="gray.400">Email</Th>
                                    <Th color="gray.400">Role</Th>
                                    <Th color="gray.400">Status</Th>
                                    <Th color="gray.400">Tel</Th>
                                    <Th color="gray.400">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users
                                    .filter((user) => user.role === "Admin")
                                    .map((user, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <Avatar name={user.name} size="md" />
                                            </Td>{" "}
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.role}</Td>
                                            <Td>
                                                <StatusIndicator status={user.status} />
                                            </Td>
                                            <Td>{user.tel}</Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Edit user"
                                                    icon={<EditIcon />}
                                                    size="md"
                                                    mr="2"
                                                />
                                                <IconButton aria-label="Delete user" icon={<DeleteIcon />} size="md" />
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr color="gray.400">
                                    <Th color="gray.400"></Th>
                                    <Th color="gray.400">Name</Th>
                                    <Th color="gray.400">Email</Th>
                                    <Th color="gray.400">Role</Th>
                                    <Th color="gray.400">Status</Th>
                                    <Th color="gray.400">Tel</Th>
                                    <Th color="gray.400">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users
                                    .filter((user) => user.role === "Account Manager")
                                    .map((user, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <Avatar name={user.name} size="md" />
                                            </Td>{" "}
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.role}</Td>
                                            <Td>
                                                <StatusIndicator status={user.status} />
                                            </Td>
                                            <Td>{user.tel}</Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Edit user"
                                                    icon={<EditIcon />}
                                                    size="md"
                                                    mr="2"
                                                />
                                                <IconButton aria-label="Delete user" icon={<DeleteIcon />} size="md" />
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr color="gray.400">
                                    <Th color="gray.400"></Th>
                                    <Th color="gray.400">Name</Th>
                                    <Th color="gray.400">Email</Th>
                                    <Th color="gray.400">Role</Th>
                                    <Th color="gray.400">Status</Th>
                                    <Th color="gray.400">Tel</Th>
                                    <Th color="gray.400">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users
                                    .filter((user) => user.role === "Client")
                                    .map((user, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <Avatar name={user.name} size="md" />
                                            </Td>{" "}
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.role}</Td>
                                            <Td>
                                                <StatusIndicator status={user.status} />
                                            </Td>
                                            <Td>{user.tel}</Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Edit user"
                                                    icon={<EditIcon />}
                                                    size="md"
                                                    mr="2"
                                                />
                                                <IconButton aria-label="Delete user" icon={<DeleteIcon />} size="md" />
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};

export default Users;
