import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import variables from '../../App.scss';
import CustomToolTip from './CustomTooltip';
function MetricLineChart(props) {
    if (props.data.length > 0)
        return (
            <ResponsiveContainer width="100%" height={props.calculatedHeight || 250}>
                <AreaChart
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis stroke={variables.textCol1} dataKey={props.x} angle={30} />
                    <YAxis stroke={variables.textCol1} />
                    <Tooltip content={<CustomToolTip toolTipLabel={props.toolTipLabel} toolTipType={props.toolTipType} />} />
                    <CartesianGrid vertical={false} />
                    <Area type="monotone" strokeWidth={2} dataKey={props.y} fill={variables.dataCol1} stroke={variables.dataCol1} />
                </AreaChart>
            </ResponsiveContainer>
        );
    else {
        return (
            <div className='text-center'>The database does not contain any data for this chart.</div>
        )
    }
}

export default MetricLineChart;