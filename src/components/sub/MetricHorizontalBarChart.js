import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import variables from '../../App.scss';
import CustomToolTip from './CustomTooltip';
function MetricHorizontalBarChart(props) {
    if (props.data.length > 0)
        return (
            <ResponsiveContainer width="95%" height={300}>
                <BarChart
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis
                        fontSize={13}
                        stroke={variables.textCol1}
                        dataKey={props.x}
                        height={100}
                        interval={0}
                        dy={20}
                        dx={-20}
                        angle={-40}
                    />
                    <YAxis fontSize={15} interval={0} stroke={variables.textCol1} />
                    <CartesianGrid vertical={false} />
                    <Tooltip cursor={{ fill: "#ffffff20" }} content={<CustomToolTip toolTipLabel={props.toolTipLabel} toolTipType={props.toolTipType} />} />
                    <Bar barSize={10} dataKey={props.y} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    else {
        return (
            <div className='text-center'>The database does not contain any data for this chart.</div>
        )
    }
}

export default MetricHorizontalBarChart;