import { Box, Flex, Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface CardProps {
    id: string;
    text: string;
    columnIndex: number;
    index: number;
    moveCard: (fromColumn: number, fromIndex: number, toColumn: number, toIndex: number) => void;
}

const Card: React.FC<CardProps> = ({ id, text, columnIndex, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: "CARD",
        hover(item: CardProps) {
            if (!ref.current) {
                return;
            }

            const dragColumnIndex = item.columnIndex;
            const hoverColumnIndex = columnIndex;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragColumnIndex === hoverColumnIndex && dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragColumnIndex, dragIndex, hoverColumnIndex, hoverIndex);
            item.index = hoverIndex;
            item.columnIndex = hoverColumnIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: { id, columnIndex, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        options: {
            dropEffect: "copy",
        },
    });

    drag(drop(ref));

    return (
        <Box
            ref={ref}
            opacity={isDragging ? 0.7 : 1}
            border="1px solid #ccc"
            borderRadius="md"
            padding="1rem"
            marginBottom="0.5rem"
            backgroundColor="white"
            boxShadow={isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"}
        >
            {text}
        </Box>
    );
};

interface BoardProps {
    columns: {
        id: string;
        title: string;
        cards: { id: string; text: string }[];
    }[];
    moveCard: (fromColumn: number, fromIndex: number, toColumn: number, toIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ columns, moveCard }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
                {isMobile ? (
                    <Stack spacing={4}>
                        {columns.map((column, columnIndex) => (
                            <Box
                                key={column.id}
                                p="4"
                                border="1px solid #ccc"
                                borderRadius="md"
                                backgroundColor="#f4f5f7"
                            >
                                <Heading as="h2" mb="3" fontSize="lg" fontWeight="bold" color="gray.700">
                                    {column.title}
                                </Heading>
                                {column.cards.map((card, cardIndex) => (
                                    <Card
                                        key={card.id}
                                        id={card.id}
                                        text={card.text}
                                        columnIndex={columnIndex}
                                        index={cardIndex}
                                        moveCard={moveCard}
                                    />
                                ))}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Flex>
                        {columns.map((column, columnIndex) => (
                            <Box
                                key={column.id}
                                flex="1"
                                p="4"
                                border="1px solid #ccc"
                                borderRadius="md"
                                mr="4"
                                backgroundColor="#f4f5f7"
                            >
                                <Heading as="h2" mb="3" fontSize="lg" fontWeight="bold" color="gray.700">
                                    {column.title}
                                </Heading>
                                {column.cards.map((card, cardIndex) => (
                                    <Card
                                        key={card.id}
                                        id={card.id}
                                        text={card.text}
                                        columnIndex={columnIndex}
                                        index={cardIndex}
                                        moveCard={moveCard}
                                    />
                                ))}
                            </Box>
                        ))}
                    </Flex>
                )}
            </Box>
        </DndProvider>
    );
};

export default Board;
