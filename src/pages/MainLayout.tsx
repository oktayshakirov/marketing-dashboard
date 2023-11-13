import { Box, Flex } from "@chakra-ui/react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
    return (
        <Flex minHeight="100vh">
            <Sidebar />
            <Flex direction="column" flex="1" width="100%">
                <Header />
                <Box as="main" p="4" flex="1">
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default MainLayout;
