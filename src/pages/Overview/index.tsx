import AreaChart from "@/components/Charts/AreaChart";
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import MiniStatistics from "@/components/Statistics/MiniStatistics";
import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import {
    MdAdsClick,
    MdLeaderboard,
    MdMoneyOff,
    MdOutlineAddChart,
    MdOutlineAttachMoney,
    MdOutlineStackedBarChart,
    MdViewStream,
} from "react-icons/md";

const Overview: React.FC = () => {
    return (
        <Flex direction={{ base: "column", md: "row" }} justify="center" wrap="wrap" gap={4}>
            <MiniStatistics keyName="leads" icon={<Icon as={MdLeaderboard} />} />
            <MiniStatistics keyName="costLead" icon={<Icon as={MdOutlineAttachMoney} />} />
            <MiniStatistics keyName="adSpend" icon={<Icon as={MdMoneyOff} />} />
            <MiniStatistics keyName="uniqueOutboundClicks" icon={<Icon as={MdAdsClick} />} />
            <MiniStatistics keyName="impressions" icon={<Icon as={MdViewStream} />} />
            <MiniStatistics keyName="reach" icon={<Icon as={MdOutlineStackedBarChart} />} />
            <MiniStatistics keyName="uniqueClicks" icon={<Icon as={MdAdsClick} />} />
            <MiniStatistics keyName="uniqueCTR" icon={<Icon as={MdOutlineAddChart} />} />
            <BarChart keyName="leadsAge" barDataKey="data" />
            <BarChart keyName="leadsGender" barDataKey="data" />
            <LineChart keyName="traffic" lineDataKey="data" />
            <AreaChart keyName="sales" areaDataKey="data" />
        </Flex>
    );
};

export default Overview;
