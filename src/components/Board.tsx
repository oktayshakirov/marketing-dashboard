import { Box, Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaEdit, FaTrash } from "react-icons/fa";

// Todo: Board and Task need to be seperated into different files
interface BoardProps {
    columns: {
        id: string;
        title: string;
        tasks: { id: string; text: string; secondaryText: string }[];
    }[];
    moveTask: (fromColumn: number, fromIndex: number, toColumn: number, toIndex: number) => void;
}

interface TaskProps {
    id: string;
    text: string;
    secondaryText: string;
    columnIndex: number;
    index: number;
}

const Board: React.FC<BoardProps> = ({ columns, moveTask }) => {
    const Task: React.FC<TaskProps> = ({ id, text, secondaryText, columnIndex, index }) => {
        const ref = useRef<HTMLDivElement>(null);

        const handleEdit = () => {
            console.log(`Edit task with id ${id}`);
        };

        const handleDelete = () => {
            console.log(`Delete task with id ${id}`);
        };

        const [, drop] = useDrop({
            accept: "Task",
            hover(item: TaskProps) {
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
                moveTask(dragColumnIndex, dragIndex, hoverColumnIndex, hoverIndex);
                item.index = hoverIndex;
                item.columnIndex = hoverColumnIndex;
            },
        });

        const [{ isDragging }, drag] = useDrag({
            type: "Task",
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
                style={{
                    cursor: "move",
                    transition: "all 0.5s ease",
                    transform: isDragging ? "scale(1.05)" : "none",
                }}
            >
                <Flex justify="space-between" alignItems="center" mb="2">
                    <Text fontWeight="bold">{text}</Text>
                    <Flex>
                        <IconButton
                            aria-label="Edit"
                            icon={<Icon as={FaEdit} boxSize="4" />}
                            onClick={handleEdit}
                            mr="2"
                        />
                        <IconButton
                            aria-label="Delete"
                            icon={<Icon as={FaTrash} boxSize="4" />}
                            onClick={handleDelete}
                        />
                    </Flex>
                </Flex>
                <Text fontSize="sm">{secondaryText}</Text>
            </Box>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
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
                            {column.tasks.map((task, taskIndex) => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    text={task.text}
                                    secondaryText={task.secondaryText}
                                    columnIndex={columnIndex}
                                    index={taskIndex}
                                />
                            ))}
                        </Box>
                    ))}
                </Flex>
            </Box>
        </DndProvider>
    );
};

export default Board;
