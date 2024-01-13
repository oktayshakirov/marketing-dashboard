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
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

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

    const handleStartDateChange = (date: string) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setSelectedEndDate(date);
    };

    const filterDataByDateRange = () => {
        if (selectedStartDate && selectedEndDate) {
            const filteredData = data.filter(
                (item) =>
                    new Date(item.name) >= new Date(selectedStartDate) &&
                    new Date(item.name) <= new Date(selectedEndDate),
            );
            return filteredData;
        }
        return data;
    };

    const renderChart = () => (
        <Card width={{ base: "100%", md: "47%" }}>
            <Box textAlign="center" mb="20px">
                <Heading as="h3" size="md">
                    {title}
                </Heading>
            </Box>
            <Box mb="10px" display="flex" justifyContent="center">
                <label htmlFor="startDate" style={{ marginRight: "10px" }}>
                    Start:
                </label>
                <input
                    type="date"
                    id="startDate"
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    value={selectedStartDate || ""}
                    style={{ border: "1px solid #ccc", borderRadius: "4px" }}
                />
                <label htmlFor="endDate" style={{ marginLeft: "10px", marginRight: "10px" }}>
                    End:
                </label>
                <input
                    type="date"
                    id="endDate"
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    value={selectedEndDate || ""}
                    style={{ border: "1px solid #ccc", borderRadius: "4px" }}
                />
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
