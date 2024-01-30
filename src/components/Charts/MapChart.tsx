import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import Map from "../../contexts/WorldMap.json";
import Card from "../Card";

const MapChartWithBarChart = () => {
    const barChartData = [
        { name: "USA", visitors: 1000 },
        { name: "Canada", visitors: 1500 },
        { name: "Mexico", visitors: 800 },
        { name: "Brazil", visitors: 1200 },
        { name: "Germany", visitors: 900 },
        { name: "France", visitors: 1100 },
    ];

    const mapData = [
        { name: "USA", coordinates: [-95.7129, 37.0902] },
        { name: "Canada", coordinates: [-106.3468, 56.1304] },
        { name: "Mexico", coordinates: [-102.5528, 23.6345] },
        { name: "Brazil", coordinates: [-51.9253, -14.235] },
        { name: "Germany", coordinates: [10.4515, 51.1657] },
        { name: "France", coordinates: [2.2137, 46.6033] },
    ];

    return (
        <Card width={"95%"} overflow={"hidden"}>
            <Flex height={400} width={"100%"} justifyContent={"center"} gap={35}>
                <ComposableMap projection="geoMercator">
                    <Geographies geography={Map}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: {
                                            fill: "#82ca9d",
                                        },
                                        hover: {
                                            fill: "white",
                                        },
                                        pressed: {
                                            fill: "black",
                                        },
                                    }}
                                    stroke="gray"
                                />
                            ))
                        }
                    </Geographies>
                    {mapData.map((data) => (
                        <Marker coordinates={[data.coordinates[0], data.coordinates[1]]}>
                            <circle r={7} fill="black" />
                        </Marker>
                    ))}
                </ComposableMap>
                <Flex width={"50%"} alignItems={"center"}>
                    <VStack>
                        <Box textAlign="center" mb="20px">
                            <Heading as="h3" size="md">
                                Sales by Locations
                            </Heading>
                        </Box>
                        <BarChart width={550} height={300} data={barChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />

                            <Bar dataKey="visitors" fill="#82ca9d" stroke="gray" />
                        </BarChart>
                    </VStack>
                </Flex>
            </Flex>
        </Card>
    );
};

export default MapChartWithBarChart;
