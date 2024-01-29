import Card from "@/components/Card";
import { Box, Heading } from "@chakra-ui/react";
import { useClient } from "@contexts/useClientContext";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartDataSet {
    title: string;
    labels: string[];
    data: number[];
    data2: number[]; // Uncomment if you want a second data series
}

interface AreaChartProps {
    keyName: string;
    areaDataKey: string;
}

const SimpleAreaChart: React.FC<AreaChartProps> = ({ keyName, areaDataKey }) => {
    const [data, setData] = useState<AreaChartData[]>([]);
    const [title, setTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedClient } = useClient();

    useEffect(() => {
        const transformData = (chartData: ChartDataSet) => {
            const transformedData = chartData.labels.map((label, index) => ({
                name: label,
                [areaDataKey]: chartData.data[index],
                data2: chartData.data2[index], // Uncomment if needed
            }));
            setData(transformedData);
        };

        if (selectedClient) {
            fetch(`/fake/charts`)
                .then((response) => response.json())
                .then((allData) => {
                    const clientData = allData[selectedClient.id];
                    if (clientData && clientData.charts && clientData.charts[keyName]) {
                        const chartData = clientData.charts[keyName];
                        transformData(chartData);
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
    }, [selectedClient, keyName, areaDataKey]);

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
                <AreaChart data={filterDataByDateRange()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={areaDataKey} fill="#51F2BF" stroke="#82ca9d" strokeWidth={3} />
                    <Area type="monotone" dataKey="data2" fill="#82ca9d" stroke="#82ca9d" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return data.length > 0 ? renderChart() : <div>No data available.</div>;
};

export default SimpleAreaChart;
