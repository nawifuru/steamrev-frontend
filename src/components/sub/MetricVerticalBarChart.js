import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import variables from '../../App.scss';
import CustomToolTip from './CustomTooltip';
function MetricVerticalBarChart(props) {
    if (props.data.length > 0)
        return (
            <ResponsiveContainer width="100%" height={props.calculatedHeight || 250}>
                <BarChart
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    layout='vertical'
                >
                    <XAxis stroke={variables.textCol1} type="number" />
                    <YAxis fontSize={15} interval={0} stroke={variables.textCol1} type="category" dataKey={props.y} />
                    <CartesianGrid horizontal={false} />
                    <Tooltip cursor={{ fill: "#ffffff20" }} content={<CustomToolTip toolTipLabel={props.toolTipLabel} toolTipType={props.toolTipType} />} />
                    <Bar barSize={10} dataKey={props.x} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    else {
        return (
            <div className='text-center'>The database does not contain any data for this chart.</div>
        )
    }
}

export default MetricVerticalBarChart;