import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Select from "react-select";
import { bigCurrencyFormat, currencyFormat, ipAddress, med_player_multiplier } from "../AppSettings";
import MetricHorizontalBarChart from "./sub/MetricHorizontalBarChart";
import MetricLineChart from "./sub/MetricLineChart";
import MetricVerticalBarChart from "./sub/MetricVerticalBarChart";

function ChartView() {
    const [metrics, setMetrics] = useState(null);
    const [filterYear, setFilterYear] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games/metrics`);
            setMetrics(results.data);
            setFilterYear(results.data.years[0]);
        }
        fetchData();
    }, []);
    return (
        metrics &&
        filterYear &&
        <Container id="ChartView">
            <Select
                id="chart-select-year"
                options={metrics.years}
                value={filterYear}
                onChange={(value) => setFilterYear(value)}
            />
            <Row className="my-5">
                <Col>
                    <div className="text-center">
                        <h2>
                            {bigCurrencyFormat(metrics.medianRevenue.filter(item => item.year === filterYear.value)[0].data.percentile_cont * med_player_multiplier)}
                        </h2>
                        <h4 className="secondary-text">Median revenue <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
                <Col>
                    <div className="text-center">
                        <h2>
                            {metrics.medianReview.filter(item => item.year === filterYear.value)[0].data.percentile_cont * med_player_multiplier}
                        </h2>
                        <h4 className="secondary-text">Median owners <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
                <Col>
                    <div className="text-center">
                        <h2>
                            {metrics.gameCount.filter(item => item.year === filterYear.value)[0].data.count}
                        </h2>
                        <h4 className="secondary-text">Games in database <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
            </Row>
            <Row className="my-5">
                <Col sm={8}>
                    <h4 className="text-center">
                        Median Review Count for Different Pricepoints <span className="data">({filterYear.label})</span>
                    </h4>
                    <MetricLineChart
                        data={metrics.pricepoints.filter(item => item.year === filterYear.value)[0].data}
                        x="initial_price"
                        y="percentile_cont"
                        toolTipLabel="Pricepoint"
                        toolTipType="currency"
                        xTickFormatter={currencyFormat}
                    />
                </Col>
                <Col sm={4}>
                    <Table variant="dark">
                        <tbody>
                            <tr>
                                <td colSpan={2}>Number of games earning above $x revenue <span className="data">({filterYear.label})</span></td>
                            </tr>
                            <tr>
                                <td>Above $10k</td>
                                <td>{metrics.above10k.filter(item => item.year === filterYear.value)[0].data.count}</td>
                            </tr>
                            <tr>
                                <td>Above $50k</td>
                                <td>{metrics.above50k.filter(item => item.year === filterYear.value)[0].data.count}</td>
                            </tr>
                            <tr>
                                <td>Above $200k</td>
                                <td>{metrics.above200k.filter(item => item.year === filterYear.value)[0].data.count}</td>
                            </tr>
                            <tr>
                                <td>Above $500k</td>
                                <td>{metrics.above500k.filter(item => item.year === filterYear.value)[0].data.count}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="my-5">
                <h4 className="text-center">
                    Median Review Count for every Genre <span className="data">({filterYear.label})</span>
                </h4>
                <MetricHorizontalBarChart
                    data={metrics.genres.filter(item => item.year === filterYear.value)[0].data}
                    x="description"
                    y="percentile_cont"
                    toolTipLabel="Genre"
                    calculatedHeight={metrics.categories.filter(item => item.year === filterYear.value)[0].data.length * 30}
                />
            </Row>
            <Row className="my-5">
                <h4 className="text-center">
                    Median Review Count for every Category <span className="data">({filterYear.label})</span>
                </h4>
                <MetricVerticalBarChart
                    data={metrics.categories.filter(item => item.year === filterYear.value)[0].data}
                    x="percentile_cont"
                    y="description"
                    toolTipLabel="Category"
                    calculatedHeight={metrics.categories.filter(item => item.year === filterYear.value)[0].data.length * 40}
                />
            </Row>
        </Container >
    );
}

export default ChartView;