import variables from '../../App.scss';
import { BarChart, Bar } from 'recharts';
function PercentileChart(props) {
    const createDataChart = (percentile) => {
        const dataPoints = [];
        for (let i = 0; i < 10; i++) {
            const point = i / 10;
            dataPoints.push({
                data: clamp((1 - Math.abs(point - percentile) * 2), 0.1, 1)
            });
        }
        return dataPoints;
    }
    const clamp = (num, min, max) => {
        return Math.min(Math.max(num, min), max);
    }
    const dataChart = createDataChart(props.percentile);

    return (
        <BarChart
            data={dataChart}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            className='m-auto'
            height={props.height || 50}
            width={props.width || 100}
        >
            <Bar dataKey="data" fill={variables.dataCol1} />
        </BarChart>
    );
}

export default PercentileChart;