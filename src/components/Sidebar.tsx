import {
    AtSignIcon,
    AttachmentIcon,
    CalendarIcon,
    ChatIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    PhoneIcon,
    SettingsIcon,
    SpinnerIcon,
    TimeIcon,
    ViewIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Image,
    Link,
    VStack,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";

type SidebarLinkProps = {
    icon: ReactElement;
    children: React.ReactNode;
    to: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, children, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const activeBg = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)");
    const inactiveBg = useColorModeValue("transparent", "transparent");
    const activeColor = useColorModeValue("green.500", "green.300");
    const inactiveColor = useColorModeValue("gray.600", "gray.400");
    const hoverBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)");

    return (
        <NavLink to={to}>
            <Button
                justifyContent="flex-start"
                alignItems="center"
                bg={isActive ? activeBg : inactiveBg}
                color={isActive ? activeColor : inactiveColor}
                w="100%"
                padding="20px"
                borderRadius="10px"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                backdropFilter="blur(10px)"
                _hover={{ bg: hoverBg, boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)" }}
                _active={{ bg: activeBg, color: activeColor }}
                _focus={{ boxShadow: "none" }}
                leftIcon={icon}
            >
                {children}
            </Button>
        </NavLink>
    );
};

const Sidebar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                display={{ md: "none" }}
                position="fixed"
                zIndex="overlay"
                bottom="15px"
                right="15px"
                bg="linear-gradient(to right, #A1FFCE, #86fde8)"
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack align="stretch" spacing="3">
                            <SidebarLink icon={<ViewIcon />} to="/" children="Overview" />
                            <SidebarLink icon={<AttachmentIcon />} to="/summary" children="Summary" />
                            <SidebarLink icon={<SpinnerIcon />} to="/analytics" children="Analytics" />
                            <SidebarLink icon={<TimeIcon />} to="/campaigns" children="Campaigns" />
                            <SidebarLink icon={<AtSignIcon />} to="/users" children="Users" />
                            <SidebarLink icon={<ChatIcon />} to="/chat" children="Chat" />
                            <SidebarLink icon={<CalendarIcon />} to="/calendar" children="Calendar" />
                            <SidebarLink icon={<PhoneIcon />} to="/videocall" children="Videocall" />
                            <SidebarLink icon={<ViewIcon />} to="/board" children="Board" />
                            <SidebarLink icon={<AttachmentIcon />} to="/files" children="Files" />
                            <SidebarLink icon={<ViewIcon />} to="/profile" children="Profile" />
                            <SidebarLink icon={<SettingsIcon />} to="/settings" children="Settings" />
                            <SidebarLink icon={<ExternalLinkIcon />} to="/" children="Sign out" />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {/* Desktop Sidebar */}
            <Box
                as="aside"
                width="200px"
                height="100vh"
                py="4"
                px="3"
                bg="#f7f8f9"
                display={{ base: "none", md: "block" }}
            >
                <Link href="/" _hover={{ textDecoration: "none" }}>
                    <Box marginBottom="6" paddingX="3">
                        <Image src="/ogno.svg" alt="Ogno Logo" />
                    </Box>
                </Link>
                <VStack align="stretch" spacing="4">
                    <SidebarLink icon={<ViewIcon />} to="/" children="Overview" />
                    <SidebarLink icon={<AttachmentIcon />} to="/summary" children="Summary" />
                    <SidebarLink icon={<SpinnerIcon />} to="/analytics" children="Analytics" />
                    <SidebarLink icon={<TimeIcon />} to="/campaigns" children="Campaigns" />
                    <SidebarLink icon={<AtSignIcon />} to="/users" children="Users" />
                    <SidebarLink icon={<ChatIcon />} to="/chat" children="Chat" />
                    <SidebarLink icon={<CalendarIcon />} to="/calendar" children="Calendar" />
                    <SidebarLink icon={<PhoneIcon />} to="/videocall" children="Videocall" />
                    <SidebarLink icon={<ViewIcon />} to="/board" children="Board" />
                    <SidebarLink icon={<AttachmentIcon />} to="/files" children="Files" />
                    <SidebarLink icon={<ViewIcon />} to="/profile" children="Profile" />
                </VStack>
            </Box>
        </>
    );
};

export default Sidebar;
