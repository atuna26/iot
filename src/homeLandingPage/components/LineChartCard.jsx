import PropTypes from 'prop-types';
import {ResponsiveContainer, LineChart,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';

const LineChartCard = (props) => {
    

    return (
        <div className={`flex flex-row items-center rounded-xl bg-white py-2 px-4  w-[800px]`}>
            <ResponsiveContainer aspect={2.0/1.0}>
                <LineChart data={props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke={props.color} />
                    {props.chartType === "double" && <Line type="monotone" dataKey="uv" stroke={props.color2} />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

LineChartCard.propTypes = {
    color: PropTypes.string,
    color2: PropTypes.string,
    chartType: PropTypes.string.isRequired,
    colSpan: PropTypes.string.isRequired,
    rowSpan: PropTypes.string.isRequired,
};

export default LineChartCard;