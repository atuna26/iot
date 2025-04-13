import { useState } from "react";
import LineChartCard from "./LineChartCard";
import BarChartCard from "./BarChartCard";
import AreaChartCard from "./AreaChartCard";

const iconOptions = [
    { value: "line_chart" },
    { value: "bar_chart" },
    { value: "area_chart"}
];
  
const ChartSelection = ({ field, form }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = iconOptions.find(opt => opt.value === field.value);
  
    return (
      <div className="relative w-[50%]">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border p-2 rounded cursor-pointer flex items-center justify-center"
        >
            {selectedOption?.value === "line_chart" && <LineChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
            {selectedOption?.value === "bar_chart" && <BarChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
            {selectedOption?.value === "area_chart" && <AreaChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
        </div>
        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border rounded shadow-lg z-10">
            {iconOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  form.setFieldValue(field.name, option.value);
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                {option.value === "line_chart" && <LineChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
                {option.value === "bar_chart" && <BarChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
                {option.value === "area_chart" && <AreaChartCard color="#8884d8" color2="#82ca9d" chartType="single"/>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default ChartSelection;
  