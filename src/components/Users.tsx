import Card from "@/components/Card";
import { Box, Flex, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
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
        }
        setSortedUsers(sortedArray);
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
                    </Select>
                </Flex>
            </Box>
            <Box>
                <Table variant="simple" color={textColor}>
                    <Thead>
                        <Tr color="gray.400">
                            <Th color="gray.400">Name</Th>
                            <Th color="gray.400">Email</Th>
                            <Th color="gray.400">Role</Th>
                            <Th color="gray.400">Status</Th>
                            <Th color="gray.400">Tel</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedUsers.map((user, index) => (
                            <Tr key={index}>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.role}</Td>
                                <Td>{user.status}</Td>
                                <Td>{user.tel}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
};

export default Users;
