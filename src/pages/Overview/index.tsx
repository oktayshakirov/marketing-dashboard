import { Flex } from "@chakra-ui/react";
import React from "react";

const Overview: React.FC = () => {
    return <Flex direction={{ base: "column", md: "row" }} justify="center" wrap="wrap" gap={4}></Flex>;
};

export default Overview;
