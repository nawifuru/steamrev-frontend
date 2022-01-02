import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import { currencyFormat, med_player_multiplier } from "../AppSettings";
import MetricLineChart from "./sub/MetricLineChart";
import MetricVerticalBarChart from "./sub/MetricVerticalBarChart";

function ChartView() {
    const [metrics, setMetrics] = useState(null);
    const [filterYear, setFilterYear] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get('http://192.168.50.87:5000/games/metrics');
            setMetrics(results.data);
            setFilterYear(results.data.years[0]);
        }
        fetchData();
    }, []);
    return (
        metrics &&
        filterYear &&
        <Container>
            <Select
                id="chart-select-year"
                options={metrics.years}
                value={filterYear}
                onChange={(value) => setFilterYear(value)}
            />
            <Row>
                <Col sm={4}>
                    <div className="text-center">
                        <h2>
                            {currencyFormat(metrics.medianRevenue.filter(item => item.year === filterYear.value)[0].data.percentile_cont * med_player_multiplier)}
                        </h2>
                        <h4 className="secondary-text">Median revenue <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="text-center">
                        <h2>
                            {metrics.medianReview.filter(item => item.year === filterYear.value)[0].data.percentile_cont * med_player_multiplier}
                        </h2>
                        <h4 className="secondary-text">Median owners <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="text-center">
                        <h2>
                            {metrics.gameCount.filter(item => item.year === filterYear.value)[0].data.count}
                        </h2>
                        <h4 className="secondary-text">Apps in database <span className="data">({filterYear.label})</span></h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <h3 className="chart-title">Median Review Count for Different Pricepoints</h3>
                <h2 className="chart-title data">({filterYear.label})</h2>
                <MetricLineChart
                    data={metrics.pricepoints.filter(item => item.year === filterYear.value)[0].data}
                    x="initial_price"
                    y="percentile_cont"
                    toolTipLabel="Pricepoint"
                    toolTipType="currency"
                />
            </Row>
            <Row>
                <h3 className="chart-title">Median Review Count for every Genre</h3>
                <h2 className="chart-title data">({filterYear.label})</h2>
                <MetricVerticalBarChart
                    data={metrics.genres.filter(item => item.year === filterYear.value)[0].data}
                    x="percentile_cont"
                    y="description"
                    toolTipLabel="Genre"
                    calculatedHeight={metrics.categories.filter(item => item.year === filterYear.value)[0].data.length * 30}
                />
            </Row>
            <Row>
                <h3 className="chart-title">Median Review Count for every Category</h3>
                <h2 className="chart-title data">({filterYear.label})</h2>
                <MetricVerticalBarChart
                    data={metrics.categories.filter(item => item.year === filterYear.value)[0].data}
                    x="percentile_cont"
                    y="description"
                    toolTipLabel="Category"
                    calculatedHeight={metrics.categories.filter(item => item.year === filterYear.value)[0].data.length * 50}
                />
            </Row>
        </Container >
    );
}

export default ChartView;