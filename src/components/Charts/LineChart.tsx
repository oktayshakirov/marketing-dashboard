import Card from "@/components/Card";
import { Box, Heading } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    name: string;
    [key: string]: string | number;
}

interface LineChartProps {
    keyName: string;
    lineDataKey: string;
}

const SimpleLineChart: React.FC<LineChartProps> = ({ keyName, lineDataKey }) => {
    const [data, setData] = useState<ChartData[]>([]);
    const [title, setTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedClient } = useClient();

    useEffect(() => {
        if (selectedClient) {
            fetch(`/fake/charts`)
                .then((response) => response.json())
                .then((allData) => {
                    const clientData = allData[selectedClient.id];
                    if (clientData && clientData.charts && clientData.charts[keyName]) {
                        const chartData = clientData.charts[keyName];
                        const transformedData = chartData.labels.map((label: string, index: number) => ({
                            name: label,
                            [lineDataKey]: chartData.data[index],
                            data2: chartData.data2[index],
                        }));
                        setData(transformedData);
                        setTitle(chartData.title);
                    } else {
                        setError(`Data not found for keyName: ${keyName}`);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [selectedClient, keyName, lineDataKey]);

    // Todo: Filtering by Date Range Logic
    const filterDataByDateRange = () => {
        return data;
    };

    const renderChart = () => (
        <Card width={{ base: "100%", md: "47%" }}>
            <Box textAlign="center" mb="20px">
                <Heading as="h3" size="md">
                    {title}
                </Heading>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filterDataByDateRange()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={lineDataKey} stroke="green" strokeWidth={3} name="Line 1" />
                    <Line type="monotone" dataKey="data2" stroke="red" strokeWidth={3} name="Line 2" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );

    if (isLoading) {
        return <div>Loading....</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return data.length > 0 ? renderChart() : <div>No data available.</div>;
};

export default SimpleLineChart;
