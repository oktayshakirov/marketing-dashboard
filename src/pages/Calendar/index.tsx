import Card from "@/components/Card";
import { Box } from "@chakra-ui/react";
import React from "react";

const Calendar: React.FC = () => {
    const calendarEmbedCode = {
        __html: '<iframe src="https://calendar.google.com/calendar/embed?src=en.uk%23holiday%40group.v.calendar.google.com&ctz=Europe%2FBerlin" style="border: 0" width="100%" height="650" frameborder="0" scrolling="no"></iframe>',
    };

    return (
        <Card>
            <Box dangerouslySetInnerHTML={calendarEmbedCode} boxShadow="md" borderRadius="lg" overflow="hidden" m={4} />
        </Card>
    );
};

export default Calendar;
