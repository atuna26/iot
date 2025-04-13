import PropTypes from 'prop-types';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,} from 'recharts';

const AreaChartCard = (props) => {
    

    return (
        <div className={`flex flex-row items-center rounded-xl bg-whitepy-2 px-4 w-[400px]`}>
            <ResponsiveContainer aspect={2.0/1.0}>
                <AreaChart width={730} height={250} data={[{
                    "name": "Güç A",
                    "uv": 4000,
                    "pv": 2400,
                },
                {
                    "name": "Güç B",
                    "uv": 3000,
                    "pv": 1398,
                },
                {
                    "name": "Güç C",
                    "uv": 2000,
                    "pv": 9800,
                },
                {
                    "name": "Güç D",
                    "uv": 2780,
                    "pv": 3908,
                },]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={props.color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={props.color} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={props.color2} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={props.color2} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke={props.color} fillOpacity={1} fill="url(#colorUv)" />
                    {props.chartType === "double" &&<Area type="monotone" dataKey="pv" stroke={props.color2} fillOpacity={1} fill="url(#colorPv)" />}
                    
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

AreaChartCard.propTypes = {
    color: PropTypes.string,
    color2: PropTypes.string,
    chartType: PropTypes.string.isRequired,
    colSpan: PropTypes.string.isRequired,
    rowSpan: PropTypes.string.isRequired,
};

export default AreaChartCard;