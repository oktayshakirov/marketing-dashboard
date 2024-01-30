import AreaChart from "@/components/Charts/AreaChart";
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import MapChart from "@/components/Charts/MapChart";
import MiniStatistics from "@/components/Statistics/MiniStatistics";
import { Box, Button, Flex, FormLabel, Icon, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    MdAdsClick,
    MdLeaderboard,
    MdMoneyOff,
    MdOutlineAddChart,
    MdOutlineAttachMoney,
    MdOutlineStackedBarChart,
    MdViewStream,
} from "react-icons/md";

const Analytics: React.FC = () => {
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

    const handleStartDateChange = (date: string) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setSelectedEndDate(date);
    };

    return (
        <Flex direction={{ base: "column", md: "row" }} justify="center" wrap="wrap" gap={4}>
            <Flex justifyContent="space-between" alignItems="center" width={"96%"}>
                <Box>
                    <Button m={1} size="md">
                        All
                    </Button>
                    <Button m={1} size="md">
                        1 Month
                    </Button>
                    <Button m={1} size="md">
                        6 Month
                    </Button>
                    <Button m={1} size="md">
                        1 Year
                    </Button>
                </Box>
                <Flex mr={7}>
                    <FormLabel htmlFor="startDate" style={{ fontSize: "18px" }}>
                        Start:
                    </FormLabel>
                    <Input
                        type="date"
                        id="startDate"
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        value={selectedStartDate || "2024-01-10"}
                        style={{ border: "1px solid #gray", borderRadius: "5px" }}
                        size="sm"
                    />

                    <FormLabel htmlFor="endDate" style={{ marginLeft: "10px", fontSize: "18px" }}>
                        End:
                    </FormLabel>
                    <Input
                        type="date"
                        id="endDate"
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        value={selectedEndDate || "2024-02-09"}
                        style={{ border: "1px solid #gray", borderRadius: "5px" }}
                        size="sm"
                    />
                </Flex>
            </Flex>
            <MiniStatistics keyName="leads" icon={<Icon as={MdLeaderboard} />} />
            <MiniStatistics keyName="costLead" icon={<Icon as={MdOutlineAttachMoney} />} prefix="$" />
            <MiniStatistics keyName="adSpend" icon={<Icon as={MdMoneyOff} />} prefix="$" />
            <MiniStatistics keyName="uniqueOutboundClicks" icon={<Icon as={MdAdsClick} />} />
            <MiniStatistics keyName="impressions" icon={<Icon as={MdViewStream} />} />
            <MiniStatistics keyName="reach" icon={<Icon as={MdOutlineStackedBarChart} />} />
            <MiniStatistics keyName="uniqueClicks" icon={<Icon as={MdAdsClick} />} />
            <MiniStatistics keyName="uniqueCTR" icon={<Icon as={MdOutlineAddChart} />} suffix="%" />
            <LineChart keyName="traffic" lineDataKey="data" />
            <AreaChart keyName="sales" areaDataKey="data" />
            <MapChart />
            <BarChart keyName="leadsAge" barDataKey="data" />
            <BarChart keyName="leadsGender" barDataKey="data" />
        </Flex>
    );
};

export default Analytics;
