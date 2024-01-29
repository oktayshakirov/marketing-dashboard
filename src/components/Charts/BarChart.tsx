import Card from "@/components/Card";
import { Box, Heading } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartData {
    name: string;
    [key: string]: string | number;
}

interface BarChartProps {
    keyName: string;
    barDataKey: string;
}

const SimpleBarChart: React.FC<BarChartProps> = ({ keyName, barDataKey }) => {
    const [data, setData] = useState<BarChartData[]>([]);
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
                            [barDataKey]: chartData.data[index],
                            // Uncomment the line below if 'data2' is used
                            // data2: chartData.data2 ? chartData.data2[index] : null,
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
    }, [selectedClient, keyName, barDataKey]);

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
                <BarChart data={filterDataByDateRange()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={barDataKey} fill="#51F2BF" stroke="#82ca9d" strokeWidth={1} />
                    {/* Uncomment the line below if 'data2' is used */}
                    {/* <Bar dataKey="data2" fill="#82ca9d" /> */}
                </BarChart>
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

export default SimpleBarChart;
