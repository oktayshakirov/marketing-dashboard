import { Box, Flex } from "@chakra-ui/react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
    const sidebarWidth = "200px";

    return (
        <Flex>
            <Box as="aside" position="fixed" width={sidebarWidth} height="100vh">
                <Sidebar />
            </Box>
            <Flex direction="column" flex="1" ml={{ base: "0", md: sidebarWidth }}>
                <Header />
                <Box as="main" p="4" flex="1" overflowY="auto">
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default MainLayout;
