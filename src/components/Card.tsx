import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface CardProps extends BoxProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
    return (
        <Box
            bg={"#f7f8f9"}
            boxShadow="md"
            rounded="lg"
            p="5"
            {...props}
            transition="all 0.3s ease-in-out"
            _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
            }}
        >
            {children}
        </Box>
    );
};

export default Card;
