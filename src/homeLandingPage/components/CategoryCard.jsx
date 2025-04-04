import styles from "../../style"
import PropTypes from 'prop-types';
import ProductCard from "./ProductCard"
import LineChartCard from "./LineChartCard";
import AreaChartCard from "./AreaChartCard";
import BarChartCard from "./BarChartCard";
const CategoryCard = (props) => {
  return (
    <div className="flex flex-col items-center w-full min-h-[300px] max-w-[450px] col-span-1">
      <div className="flex w-full items-center justify-between px-4">
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            {props.name}
        </p>
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            <i className="fa-solid fa-temperature-high text-red-800 font-light"></i>
        </p>
      </div>
      <div className={`w-full grid ${props.width} gap-2`}>

        {props.parameters.map((parameter) => (
          <ProductCard key={parameter.name} icon={parameter.icon} name={parameter.label} status={parameter.status} isIncludePercantage={parameter.isIncludePercantage} rowSpan={parameter.rowSpan} colSpan={parameter.colSpan} color={parameter.color}/>
        ))}

        {/* <ProductCard icon="fa-solid fa-faucet" name="Su" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-yellow-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Koltuk Işık" status="Açık" isIncludePercantage={false} rowSpan="row-span-8" colSpan="col-span-2" color="bg-green-600"/>
        <ProductCard icon="fa-solid fa-fire-flame-simple" name="Şömine" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-red-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Oda Lambasi" status="100" isIncludePercantage={true} rowSpan="row-span-4" colSpan="col-span-2" color="bg-blue-300" /> */}


        {/* <LineChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d"  chartType="single"/>
        <AreaChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/>
        <BarChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/> */}
      </div>
    </div>
  )
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      rowSpan: PropTypes.string.isRequired,
      colSpan: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isIncludePercantage: PropTypes.bool.isRequired,
      statues: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CategoryCard
