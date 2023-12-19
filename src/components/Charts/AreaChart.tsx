import Card from "@/components/Card";
import { Box, Heading } from "@chakra-ui/react";
import { PureComponent } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartDataSet {
    title: string;
    labels: string[];
    data: number[];
    // data2: number[]; // Uncomment if you want a second data series
}

interface AreaChartProps {
    keyName: string;
    areaDataKey: string;
}

interface AreaChartState {
    data: AreaChartData[];
    title: string;
    isLoading: boolean;
    error: string | null;
}

export default class SimpleAreaChart extends PureComponent<AreaChartProps, AreaChartState> {
    state: AreaChartState = {
        data: [],
        title: "",
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        fetch("/fake/charts")
            .then((response) => response.json())
            .then((allData: { [key: string]: ChartDataSet }) => {
                const { keyName } = this.props;
                const chartData = allData[keyName];
                if (chartData) {
                    this.transformData(chartData);
                    this.setState({ title: chartData.title });
                } else {
                    this.setState({ error: `Data not found for keyName: ${keyName}`, isLoading: false });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message, isLoading: false });
            });
    }

    transformData(chartData: ChartDataSet) {
        const { areaDataKey } = this.props;
        const transformedData = chartData.labels.map((label, index) => ({
            name: label,
            [areaDataKey]: chartData.data[index],
            // data2: chartData.data2[index], // Uncomment if you want a second data series
        }));
        this.setState({ data: transformedData, isLoading: false });
    }

    renderChart(data: AreaChartData[], title: string) {
        const { areaDataKey } = this.props;
        return (
            <Card width={{ base: "100%", md: "47%" }}>
                <Box textAlign="center" mb="20px">
                    <Heading as="h3" size="md">
                        {title}
                    </Heading>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey={areaDataKey} fill="#A1FFCE" stroke="cyan" />
                        {/* <Area type="monotone" dataKey="data2" stroke="#82ca9d" fill="#82ca9d" /> */}
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }

    render() {
        const { isLoading, error, data, title } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return data.length > 0 ? this.renderChart(data, title) : <div>No data available.</div>;
    }
}
