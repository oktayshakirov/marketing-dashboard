import { Box } from "@chakra-ui/react";
import BoardComponent from "@components/Board";
import React, { useState } from "react";

interface Column {
    id: string;
    title: string;
    cards: { id: string; text: string }[];
}

const Board: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "column1",
            title: "To Do",
            cards: [
                { id: "1", text: "Create wireframes for homepage redesign" },
                { id: "2", text: "Design user interface elements for new feature" },
                { id: "3", text: "Review and select color palette for the project" },
            ],
        },
        {
            id: "column2",
            title: "In Progress",
            cards: [
                { id: "4", text: "Refine typography styles for improved readability" },
                { id: "5", text: "Work on illustrations for onboarding screens" },
            ],
        },
        {
            id: "column3",
            title: "Done",
            cards: [
                { id: "6", text: "Finalize high-fidelity mockups for client presentation" },
                { id: "7", text: "Create design assets for social media promotion" },
                { id: "8", text: "Implement design feedback from stakeholders" },
            ],
        },
    ]);

    const moveCard = (fromColumn: number, fromIndex: number, toColumn: number, toIndex: number) => {
        if (
            fromColumn < 0 ||
            fromColumn >= columns.length ||
            toColumn < 0 ||
            toColumn >= columns.length ||
            fromIndex < 0 ||
            fromIndex >= columns[fromColumn].cards.length ||
            toIndex < 0 ||
            toIndex >= columns[toColumn].cards.length
        ) {
            return;
        }

        const updatedColumns = [...columns];
        const [removedCard] = updatedColumns[fromColumn].cards.splice(fromIndex, 1);
        updatedColumns[toColumn].cards.splice(toIndex, 0, removedCard);
        setColumns(updatedColumns);
    };

    return (
        <Box p="4">
            <BoardComponent columns={columns} moveCard={moveCard} />
        </Box>
    );
};

export default Board;
