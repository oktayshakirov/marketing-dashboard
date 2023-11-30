import Card from "@/components/Card";
import AreaChart from "@/components/Charts/AreaChart";
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import { Flex } from "@chakra-ui/react";
import React from "react";

const Overview: React.FC = () => {
    return (
        <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={5}>
            <Card width={{ base: "100%", md: "48%" }}>
                <LineChart category="Sales" lineDataKey="Sales" />
            </Card>
            <Card width={{ base: "100%", md: "48%" }}>
                <LineChart category="Traffic" lineDataKey="Traffic" />
            </Card>
            <Card width={{ base: "100%", md: "48%" }}>
                <AreaChart category="Traffic" areaDataKey="data" />
            </Card>
            <Card width={{ base: "100%", md: "48%" }}>
                <AreaChart category="Sales" areaDataKey="data" />
            </Card>
            <Card width={{ base: "100%", md: "48%" }}>
                <BarChart category="Sales" barDataKey="data" />
            </Card>
            <Card width={{ base: "100%", md: "48%" }}>
                <BarChart category="Traffic" barDataKey="data" />
            </Card>
        </Flex>
    );
};

export default Overview;
