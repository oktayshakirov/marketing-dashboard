import { PureComponent } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartData {
    [key: string]: string | number;
}

interface RawDataItem {
    category: string;
    labels: string[];
    data: number[];
    // data2: number[]; // Uncomment if you want a second data series
}

interface AreaChartProps {
    areaDataKey: string;
    category: string;
}

interface AreaChartState {
    data: AreaChartData[];
    isLoading: boolean;
    error: string | null;
}

export default class SimpleAreaChart extends PureComponent<AreaChartProps, AreaChartState> {
    state: AreaChartState = {
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
        const { category, areaDataKey } = this.props;

        const categoryData = rawData.find((item) => item.category === category);
        if (categoryData) {
            const transformedData: AreaChartData[] = categoryData.labels.map((label, index) => ({
                name: label,
                [areaDataKey]: categoryData.data[index],
                // Uncomment if you want a second data series
                // data2: categoryData.data2[index],
            }));
            this.setState({ data: transformedData, isLoading: false });
        } else {
            this.setState({ error: `Data not found for category: ${category}`, isLoading: false });
        }
    }

    renderChart(data: AreaChartData[]) {
        const { areaDataKey } = this.props;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={areaDataKey} stroke="#8884d8" fill="#8884d8" />
                    {/* Uncomment if you want a second area
                    <Area type="monotone" dataKey="data2" stroke="#82ca9d" fill="#82ca9d" />
                    */}
                </AreaChart>
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
