import Card from "@/components/Card";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Select,
    Table,
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
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [sortedUsers, setSortedUsers] = useState<UserData[]>([]);
    const [sortType, setSortType] = useState<string>("name");
    const [error, setError] = useState<string | null>(null);
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
        } else if (type === "role") {
            sortedArray.sort((a, b) => a.role.localeCompare(b.role));
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
                    <Select onChange={handleSortChange} w="200px">
                        <option value="name">Sort by Name</option>
                        <option value="role">Sort by Role</option>
                        <option value="status">Sort by Status</option>
                    </Select>
                </Flex>
            </Box>
            <Box>
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
                        {sortedUsers.map((user, index) => (
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
            </Box>
        </Card>
    );
};

export default Users;
