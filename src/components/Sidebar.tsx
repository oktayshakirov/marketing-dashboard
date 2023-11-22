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
import { Box, Button, Icon, Image, VStack, useColorModeValue } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

type SidebarLinkProps = {
    icon: typeof AtSignIcon;
    children: React.ReactNode;
    to: string;
};

const Sidebar = () => {
    const location = useLocation();

    const SidebarLink = ({ icon, children, to }: SidebarLinkProps) => {
        const isActive = location.pathname === to;
        const activeBg = useColorModeValue("gray.200", "gray.700");
        const inactiveBg = useColorModeValue("transparent", "transparent");
        const activeColor = useColorModeValue("blue.500", "blue.300");
        const inactiveColor = useColorModeValue("gray.600", "gray.400");

        return (
            <NavLink to={to}>
                <Button
                    justifyContent="flex-start"
                    alignItems="center"
                    bg={isActive ? activeBg : inactiveBg}
                    color={isActive ? activeColor : inactiveColor}
                    w="100%"
                    _hover={{
                        bg: isActive ? activeBg : inactiveBg,
                    }}
                    _active={{
                        bg: activeBg,
                        color: activeColor,
                    }}
                    _focus={{
                        boxShadow: "none",
                    }}
                    leftIcon={<Icon as={icon} />}
                >
                    {children}
                </Button>
            </NavLink>
        );
    };

    return (
        <Box as="aside" width="250px" height="100vh" py="4" px="3" bg="linear-gradient(to right, #A1FFCE, #86fde8)">
            <Box marginBottom="6" paddingX="3">
                <Image src="/ogno.svg" alt="Ogno Logo" />
            </Box>
            <VStack align="stretch" spacing="3">
                <SidebarLink icon={ViewIcon} to="/">
                    Overview
                </SidebarLink>
                <SidebarLink icon={SpinnerIcon} to="/analytics">
                    Analytics
                </SidebarLink>
                <SidebarLink icon={TimeIcon} to="/campaigns">
                    Campaigns
                </SidebarLink>
                <SidebarLink icon={AtSignIcon} to="/users">
                    Users
                </SidebarLink>
                <SidebarLink icon={ChatIcon} to="/chat">
                    Chat
                </SidebarLink>
                <SidebarLink icon={CalendarIcon} to="/calendar">
                    Calendar
                </SidebarLink>
                <SidebarLink icon={PhoneIcon} to="/videocall">
                    Videocall
                </SidebarLink>
                <SidebarLink icon={AttachmentIcon} to="/summary">
                    Summary
                </SidebarLink>
                <SidebarLink icon={ViewIcon} to="/board">
                    Board
                </SidebarLink>
                <SidebarLink icon={AttachmentIcon} to="/files">
                    Files
                </SidebarLink>
                <SidebarLink icon={SettingsIcon} to="/settings">
                    Settings
                </SidebarLink>
                <SidebarLink icon={ExternalLinkIcon} to="/signout">
                    Sign out
                </SidebarLink>
            </VStack>
        </Box>
    );
};

export default Sidebar;
