import Card from "@/components/Card";
import { PureComponent } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartDataSet {
    title: string;
    labels: string[];
    data: number[];
    // data2: number[]; // Uncomment if you want a second data series
}

interface BarChartProps {
    keyName: string;
    barDataKey: string;
}

interface BarChartState {
    data: BarChartData[];
    title: string;
    isLoading: boolean;
    error: string | null;
}

export default class SimpleBarChart extends PureComponent<BarChartProps, BarChartState> {
    state: BarChartState = {
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
        const { barDataKey } = this.props;
        const transformedData = chartData.labels.map((label, index) => ({
            name: label,
            [barDataKey]: chartData.data[index],
            // data2: chartData.data2[index], // Uncomment if you want a second data series
        }));
        this.setState({ data: transformedData, isLoading: false });
    }

    renderChart(data: BarChartData[], title: string) {
        const { barDataKey } = this.props;
        return (
            <Card width={{ base: "100%", md: "47%" }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h3>{title}</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Bar dataKey={barDataKey} fill="#A1FFCE" />
                        {/* <Bar dataKey="data2" fill="#82ca9d" /> */}
                    </BarChart>
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
