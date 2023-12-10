import Card from "@/components/Card";
import { PureComponent } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    [key: string]: string | number;
}

interface RawDataItem {
    category: string;
    labels: string[];
    data: number[];
    data2: number[];
}

interface LineChartProps {
    lineDataKey: string;
    category: string;
}

interface LineChartState {
    data: ChartData[];
    isLoading: boolean;
    error: string | null;
}

export default class SimpleLineChart extends PureComponent<LineChartProps, LineChartState> {
    state: LineChartState = {
        data: [],
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        fetch("/fake/charts")
            .then((response) => response.json())
            .then((data: RawDataItem[]) => this.transformData(data))
            .catch((error) => {
                this.setState({ error: error.message, isLoading: false });
            });
    }

    transformData(rawData: RawDataItem[]) {
        const { category, lineDataKey } = this.props;

        const categoryData = rawData.find((item) => item.category === category);
        if (categoryData) {
            const transformedData: ChartData[] = categoryData.labels.map((label, index) => ({
                name: label,
                [lineDataKey]: categoryData.data[index],
                data2: categoryData.data2[index],
            }));
            this.setState({ data: transformedData, isLoading: false });
        } else {
            this.setState({ error: `Data not found for category: ${category}`, isLoading: false });
        }
    }

    renderChart(data: ChartData[]) {
        const { lineDataKey } = this.props;

        return (
            <Card width={{ base: "100%", md: "47%" }}>
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
        const { isLoading, error, data } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return data.length > 0 ? this.renderChart(data) : <div>No data available.</div>;
    }
}
