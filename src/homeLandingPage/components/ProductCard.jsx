import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from "../../style";
import BarChartCard from './BarChartCard';
import LineChartCard from './LineChartCard';
import AreaChartCard from "./AreaChartCard"
import { useSelector } from 'react-redux';

const ProductCard = (props) => {
    const [status, setStatus] = useState(props.status);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [chartData,setChartData] = useState([]);
    const token = useSelector((state) => state.token);

    const toggleStatus = () => {
        if (props.isIncludePercantage) {
            setStatus((prevStatus) => (prevStatus === "100" ? "Kapalı" : "100"));
        } else {
            setStatus((prevStatus) => (prevStatus === "Açık" ? "Kapalı" : "Açık"));
        }
    };

    const postChartData = async (filterType) => {
        console.log("a")
        const response = await fetch("http://85.95.244.99:8999/api/v1/templates/sensor-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                serialNumber: props.serialNumber,
                key: props.deviceKey,
                filterType: filterType,
            }),
        })
        const data = await response.json();
        setChartData(data);
    }

    const handleRangeChange = (event) => {
        setStatus(`${event.target.value}`);
    };

    const handleCardClick = () => {
        postChartData("year")
        setIsModalOpen(true);
    };

    const handleBackdropClick = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Card */}
            <div  onClick={props.isItRelay ? undefined  : handleCardClick} className={`${props.colSpan} ${props.rowSpan} row-span-2 flex flex-row items-center bg-white rounded-xl shadow-lg py-2 px-4 border border-[#e0e0e0] cursor-pointer`}>
                <div style={{ backgroundColor: status != 0 ? props.color : "#ccc" }}
                    className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
                    <i  onClick={props.isItRelay ? ()=> props.openSureModalForRelay(props.deviceKey, status, props.name) : undefined } className={`${props.icon} fs-4 text-[25px]`}></i>
                </div>
                <div className="ml-2 flex flex-col items-start justify-center">
                    <p className="font-poppins font-semibold text-[15px] text-primary max-w-[100px] truncate">
                        {props.name}
                    </p>
                    <p className="font-poppins font-normal text-[14px] text-primary text-center md:text-start">
                        {props.isIncludePercantage && status !== "Kapalı" ? `%${status}` : status}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleBackdropClick}
                >
                    <div
                        className="bg-white p-6 pt-0 rounded-lg shadow-lg flex flex-col items-center justify-between  w-[900px] relative"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className='flex flex-row items-center justify-between w-full pt-2'>
                            <h2 className="text-xl font-bold">
                                {props.name}
                            </h2>
                            <select
                                className="border border-gray-300 rounded-md p-2"
                                onChange={(e) => postChartData(e.target.value)}
                            >
                                <option value="year">Yıllık</option>
                                <option value="month">Aylık</option>
                                <option value="day">Günlük</option>
                                <option value="hour">Saatlik</option>
                                <option value="minute">Dakikalık</option>
                            </select>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none text-red-900 text-xl"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            {props.visualization === "bar_chart" && (
                                <BarChartCard color="#8884d8" color2="#82ca9d" chartType="single" data={chartData} />
                            )}
                            {props.visualization === "line_chart" && (
                                <LineChartCard color="#8884d8" color2="#82ca9d"  chartType="single"  data={chartData} />
                            )}
                            {props.visualization === "area_chart" && (
                                <AreaChartCard color="#8884d8" color2="#82ca9d"  chartType="single"/>
                            )}
                        </div>                        
                    </div>
                </div>
            )}
        </>
    );
};

ProductCard.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    deviceKey: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    isIncludePercantage: PropTypes.bool.isRequired,
    visualization: PropTypes.string,
    isItRelay: PropTypes.bool.isRequired,
    colSpan: PropTypes.string.isRequired,
    rowSpan: PropTypes.string.isRequired,
};

export default ProductCard;
