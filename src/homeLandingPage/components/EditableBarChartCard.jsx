import PropTypes from "prop-types";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const EditableBarChartCard = (props) => {
  return (
    <div className="flex flex-row items-center rounded-xl bg-white shadow-lg py-2 px-4 border border-[#e0e0e0] h-full w-full">
      <ResponsiveContainer aspect={2.0 / 1.0}>
        <BarChart
          data={[
            {
              name: "Güç A",
              uv: 4000,
              pv: 2400,
            },
            {
              name: "Güç B",
              uv: 3000,
              pv: 1398,
            },
            {
              name: "Güç C",
              uv: 2000,
              pv: 9800,
            },
            {
              name: "Güç D",
              uv: 2780,
              pv: 3908,
            },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill={props.color} />
          {props.chartType === "double" && <Bar dataKey="uv" fill={props.color2}/>}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

EditableBarChartCard.propTypes = {
  color: PropTypes.string,
  color2: PropTypes.string,
  chartType: PropTypes.string.isRequired,
};

export default EditableBarChartCard;
