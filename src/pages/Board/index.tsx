import { Box } from "@chakra-ui/react";
import BoardComponent from "@components/Board";
import React, { useState } from "react";

interface Column {
    id: string;
    title: string;
    tasks: { id: string; text: string; secondaryText: string }[];
}

const Board: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "column1",
            title: "To Do",
            tasks: [
                { id: "1", text: "Design new landing page", secondaryText: "High priority task" },
                {
                    id: "2",
                    text: "Design user interface elements for new feature",
                    secondaryText: "Needs input from the marketing team",
                },
                {
                    id: "3",
                    text: "Review and select color palette for the project",
                    secondaryText: "Collaborate with the design team",
                },
            ],
        },
        {
            id: "column2",
            title: "In Progress",
            tasks: [
                {
                    id: "4",
                    text: "Refine typography styles for improved readability",
                    secondaryText: "In Progress - Initial drafts completed",
                },
                {
                    id: "5",
                    text: "Work on illustrations for onboarding screens",
                    secondaryText: "In Progress - Pending feedback from stakeholders",
                },
            ],
        },
        {
            id: "column3",
            title: "Done",
            tasks: [
                {
                    id: "6",
                    text: "Finalize high-fidelity mockups for client presentation",
                    secondaryText: "Completed successfully",
                },
                {
                    id: "7",
                    text: "Create design assets for social media promotion",
                    secondaryText: "Completed with minor revisions",
                },
                {
                    id: "8",
                    text: "Implement design feedback from stakeholders",
                    secondaryText: "Implemented changes based on stakeholder input",
                },
            ],
        },
    ]);

    const moveTask = (fromColumn: number, fromIndex: number, toColumn: number, toIndex: number) => {
        if (
            fromColumn < 0 ||
            fromColumn >= columns.length ||
            toColumn < 0 ||
            toColumn >= columns.length ||
            fromIndex < 0 ||
            fromIndex >= columns[fromColumn].tasks.length ||
            toIndex < 0 ||
            toIndex >= columns[toColumn].tasks.length
        ) {
            return;
        }

        const updatedColumns = [...columns];
        const [removedTask] = updatedColumns[fromColumn].tasks.splice(fromIndex, 1);
        updatedColumns[toColumn].tasks.splice(toIndex, 0, removedTask);
        setColumns(updatedColumns);
    };

    return (
        <Box p="4">
            <BoardComponent columns={columns} moveTask={moveTask} />
        </Box>
    );
};

export default Board;
