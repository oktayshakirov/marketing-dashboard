import CampaignsTable from "@/components/Campaigns";
import CampaignStatistics from "@/components/Statistics/CampaignStatistics";
import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { MdAccessTime, MdLeaderboard, MdTask, MdTrendingUp } from "react-icons/md";

const Campaigns: React.FC = () => {
    return (
        <Box>
            <Flex direction={{ base: "column", md: "row" }} justify="center" wrap="wrap" gap={8} m={5}>
                <CampaignStatistics keyName="campaigns" icon={<Icon as={MdLeaderboard} />} />
                <CampaignStatistics keyName="tasks" icon={<Icon as={MdTask} />} />
                <CampaignStatistics keyName="time" icon={<Icon as={MdAccessTime} />} />
                <CampaignStatistics keyName="progress" icon={<Icon as={MdTrendingUp} />} />
            </Flex>
            <Box width="95%" mx="auto">
                <CampaignsTable />
            </Box>
        </Box>
    );
};

export default Campaigns;
