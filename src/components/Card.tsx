import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface CardProps extends BoxProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
    const bgColor = useColorModeValue("rgba(161, 255, 206, 0.15)", "gray.700");
    const shadow = useColorModeValue("md", "dark-lg");

    return (
        <Box bg={bgColor} boxShadow={shadow} rounded="lg" p="5" {...props}>
            {children}
        </Box>
    );
};

export default Card;
