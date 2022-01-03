import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import variables from '../../App.scss';
import CustomToolTip from './CustomTooltip';
function MetricHorizontalBarChart(props) {
    if (props.data.length > 0)
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis stroke={variables.textCol1} dataKey={props.x} interval={0} angle={-30} />
                    <YAxis fontSize={15} interval={0} stroke={variables.textCol1} />
                    <CartesianGrid horizontal={false} />
                    <Tooltip cursor={{ fill: "#ffffff20" }} content={<CustomToolTip toolTipLabel={props.toolTipLabel} toolTipType={props.toolTipType} />} />
                    <Bar barSize={10} dataKey={props.y} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    else {
        return (
            <div className='text-center'>The database does not contain any data yet.</div>
        )
    }
}

export default MetricHorizontalBarChart;