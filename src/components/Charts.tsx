import { Card } from "@components/Card";
import { ApexOptions } from "apexcharts";
import { Component } from "react";
import ReactApexChart from "react-apexcharts";

import { barChartData, barChartOptions, lineChartData, lineChartOptions } from "../variables/charts";

interface LineChartProps {}

interface LineChartState {
    chartData: typeof lineChartData;
    chartOptions: typeof lineChartOptions;
}

class LineChart extends Component<LineChartProps, LineChartState> {
    constructor(props: LineChartProps) {
        super(props);

        this.state = {
            chartData: lineChartData,
            chartOptions: lineChartOptions,
        };
    }

    componentDidMount() {}

    render() {
        return (
            <ReactApexChart
                options={this.state.chartOptions as ApexOptions}
                series={this.state.chartData}
                type="area"
                width="100%"
                height="100%"
            />
        );
    }
}

interface BarChartProps {}

interface BarChartState {
    chartData: typeof barChartData;
    chartOptions: typeof barChartOptions;
}

class BarChart extends Component<BarChartProps, BarChartState> {
    constructor(props: BarChartProps) {
        super(props);

        this.state = {
            chartData: barChartData,
            chartOptions: barChartOptions,
        };
    }

    componentDidMount() {}

    render() {
        return (
            <Card
                py="1rem"
                height={{ sm: "300px" }}
                width="100%"
                bg="linear-gradient(to right, #00c3ff, #ffff1c)"
                position="relative"
            >
                <ReactApexChart
                    options={this.state.chartOptions as ApexOptions}
                    series={this.state.chartData}
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </Card>
        );
    }
}

export { BarChart, LineChart };
