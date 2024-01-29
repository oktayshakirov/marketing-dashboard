import Card from "@/components/Card";
import { Box } from "@chakra-ui/react";
import React from "react";

const Calendar: React.FC = () => {
    const calendarEmbedCode = {
        __html: '<iframe src="https://calendar.google.com/calendar/embed?height=650&wkst=2&bgcolor=%23ffffff&ctz=UTC&showTitle=0&showTabs=0&showPrint=0&showTz=0&showCalendars=0&showDate=0&showNav=0&src=ZW4uZ2VybWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5" style="border-width:0" width="100%" height="650" frameborder="0" scrolling="no"></iframe>',
    };

    return (
        <Card>
            <Box dangerouslySetInnerHTML={calendarEmbedCode} boxShadow="md" borderRadius="lg" overflow="hidden" m={4} />
        </Card>
    );
};

export default Calendar;
