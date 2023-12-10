import Card from "@/components/Card";
import { PureComponent } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartDataSet {
    title: string;
    labels: string[];
    data: number[];
    data2: number[];
}

interface LineChartProps {
    keyName: string;
    lineDataKey: string;
}

interface LineChartState {
    data: ChartData[];
    title: string;
    isLoading: boolean;
    error: string | null;
}

export default class SimpleLineChart extends PureComponent<LineChartProps, LineChartState> {
    state: LineChartState = {
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
        const { lineDataKey } = this.props;
        const transformedData = chartData.labels.map((label, index) => ({
            name: label,
            [lineDataKey]: chartData.data[index],
            data2: chartData.data2[index],
        }));
        this.setState({ data: transformedData, isLoading: false });
    }

    renderChart(data: ChartData[], title: string) {
        const { lineDataKey } = this.props;
        return (
            <Card width={{ base: "100%", md: "47%" }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h3>{title}</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
