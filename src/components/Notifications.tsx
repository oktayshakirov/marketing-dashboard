// Notifications.tsx
import { BellIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Divider, IconButton, Text, VStack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Notification {
    id: number;
    title: string;
    content: string;
    timestamp: string;
}

const Notifications: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationsUrl = `${import.meta.env.VITE_BACKEND_URL}/notifications`;
                const response = await axios.get<Notification[]>(notificationsUrl);
                setNotifications(response.data);
                setNotificationCount(response.data.length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            <Box position="relative">
                <IconButton
                    icon={<BellIcon w={6} h={6} />}
                    variant="ghost"
                    aria-label="Notifications"
                    onClick={isOpen ? onClose : onOpen}
                />
                {notificationCount > 0 && (
                    <Box
                        position="absolute"
                        top="-1"
                        right="0"
                        px={1.5}
                        fontSize="xs"
                        fontWeight="bold"
                        color="white"
                        bg="red.500"
                        borderRadius="full"
                        visibility={isOpen ? "hidden" : "visible"}
                    >
                        {notificationCount}
                    </Box>
                )}
            </Box>

            {isOpen && (
                <Box
                    position="absolute"
                    top="59"
                    right="0"
                    p="4"
                    bg="white"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    borderRadius="md"
                    zIndex={1}
                    minW="300"
                    onClick={onClose}
                >
                    <IconButton
                        icon={<CloseIcon />}
                        aria-label="Close"
                        position="absolute"
                        top="1"
                        right="2"
                        onClick={onClose}
                        color={"black"}
                        bg={"white"}
                    />

                    <VStack align="start" spacing="4">
                        {notifications.map((notification) => (
                            <Box key={notification.id}>
                                <Text fontWeight="bold">{notification.title}</Text>
                                <Text>{notification.content}</Text>
                                <Text color="gray.500">{notification.timestamp}</Text>
                                <Divider my="2" />
                            </Box>
                        ))}
                    </VStack>
                </Box>
            )}
        </>
    );
};

export default Notifications;
