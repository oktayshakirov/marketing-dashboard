import {
    AtSignIcon,
    AttachmentIcon,
    CalendarIcon,
    ChatIcon,
    ExternalLinkIcon,
    PhoneIcon,
    SettingsIcon,
    SpinnerIcon,
    TimeIcon,
    ViewIcon,
} from "@chakra-ui/icons";
import { Box, HStack, Heading, Icon, Image, Link, VStack } from "@chakra-ui/react";

const Sidebar = () => {
    return (
        <Box as="aside" width="250px" height="100vh" paddingY="4" paddingX="3" bg="gray.100">
            <Box marginBottom="6" paddingX="3">
                <Image src="/ogno.svg" alt="Ogno Logo" />
            </Box>
            <Heading as="h3" size="md" marginBottom="6">
                Dashboard
            </Heading>
            <VStack align="stretch" spacing="3">
                <Link href="/">
                    <HStack>
                        <Icon as={ViewIcon} />
                        <span>Overview</span>
                    </HStack>
                </Link>
                <Link href="/analytics">
                    <HStack>
                        <Icon as={SpinnerIcon} />
                        <span>Analytics</span>
                    </HStack>
                </Link>
                <Link href="/campaigns">
                    <HStack>
                        <Icon as={TimeIcon} />
                        <span>Campaigns</span>
                    </HStack>
                </Link>
                <Link href="/users">
                    <HStack>
                        <Icon as={AtSignIcon} />
                        <span>Users</span>
                    </HStack>
                </Link>
                <Link href="/chat">
                    <HStack>
                        <Icon as={ChatIcon} />
                        <span>Chat</span>
                    </HStack>
                </Link>
                <Link href="/calendar">
                    <HStack>
                        <Icon as={CalendarIcon} />
                        <span>Calendar</span>
                    </HStack>
                </Link>
                <Link href="/videocall">
                    <HStack>
                        <Icon as={PhoneIcon} />
                        <span>Videocall</span>
                    </HStack>
                </Link>
                <Link href="/summary">
                    <HStack>
                        <Icon as={AttachmentIcon} />
                        <span>Summary</span>
                    </HStack>
                </Link>
                <Link href="/board">
                    <HStack>
                        <Icon as={ViewIcon} />
                        <span>Board</span>
                    </HStack>
                </Link>
                <Link href="/files">
                    <HStack>
                        <Icon as={AttachmentIcon} />
                        <span>Files</span>
                    </HStack>
                </Link>
                <Link href="/settings">
                    <HStack>
                        <Icon as={SettingsIcon} />
                        <span>Settings</span>
                    </HStack>
                </Link>
                <Link href="/signout">
                    <HStack>
                        <Icon as={ExternalLinkIcon} />
                        <span>Sign out</span>
                    </HStack>
                </Link>
            </VStack>
        </Box>
    );
};

export default Sidebar;
