import { PureComponent } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartData {
    [key: string]: string | number;
}

interface RawDataItem {
    category: string;
    labels: string[];
    data: number[];
    // data2: number[]; // Uncomment if you want a second data series
}

interface BarChartProps {
    barDataKey: string;
    category: string;
}

interface BarChartState {
    data: BarChartData[];
    isLoading: boolean;
    error: string | null;
}

export default class SimpleBarChart extends PureComponent<BarChartProps, BarChartState> {
    state: BarChartState = {
        data: [],
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        fetch("/fake/charts")
            .then((response) => response.json())
            .then((data) => this.transformData(data))
            .catch((error) => {
                this.setState({ error: error.message, isLoading: false });
            });
    }

    transformData(rawData: RawDataItem[]) {
        const { category, barDataKey } = this.props;

        const categoryData = rawData.find((item) => item.category === category);
        if (categoryData) {
            const transformedData: BarChartData[] = categoryData.labels.map((label, index) => ({
                name: label,
                [barDataKey]: categoryData.data[index],
                // Uncomment if you want a second data series
                // data2: categoryData.data2[index],
            }));
            this.setState({ data: transformedData, isLoading: false });
        } else {
            this.setState({ error: `Data not found for category: ${category}`, isLoading: false });
        }
    }

    renderChart(data: BarChartData[]) {
        const { barDataKey } = this.props;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={barDataKey} fill="#8884d8" />
                    {/* Uncomment if you want a second bar
                    <Bar dataKey="data2" fill="#82ca9d" />
                    */}
                </BarChart>
            </ResponsiveContainer>
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
