import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from "../../style";

const ProductCard = (props) => {
    const [status, setStatus] = useState(props.status);
    
    const toggleStatus = () => {
        if (props.isIncludePercantage) {
            setStatus((prevStatus) => (prevStatus === "%100" ? "Kapalı" : "%100"));
        } else {
            setStatus((prevStatus) => (prevStatus === "Açık" ? "Kapalı" : "Açık"));
        }
    };

    const handleRangeChange = (event) => {
        setStatus(`${event.target.value}`);
    };

    return (
        <div className={`${props.colSpan} ${props.rowSpan} row-span-2 flex flex-row items-center rounded-xl bg-white shadow-lg py-2 px-4 border border-[#e0e0e0]`}>
            <div className={` ${status !== "Kapalı" ? props.color : "bg-gray"} w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                <i className={`${props.icon} fs-4 text-[25px] cursor-pointer`} onClick={toggleStatus}></i>
            </div>
            <div className="ml-2 flex flex-col items-start justify-center">
                <p className="font-poppins font-semibold text-[15px] text-primary 
                    max-w-[100px] w-full truncate overflow-hidden whitespace-nowrap block">
                    {props.name}
                </p>
                <p className="font-poppins font-normal text-[14px] text-primary w-full text-center md:text-start">
                     {props.isIncludePercantage ? "%"+status : status}
                </p>
                {props.isIncludePercantage && (
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={parseInt(status)}
                        onChange={handleRangeChange}
                        className={`max-w-[100px] w-full mt-2 range-input ${props.color}`} 
                    />
                )}
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    isIncludePercantage: PropTypes.bool.isRequired,
    colSpan: PropTypes.string.isRequired,
    rowSpan: PropTypes.string.isRequired,
};

export default ProductCard;