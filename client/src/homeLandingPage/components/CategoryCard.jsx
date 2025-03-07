import styles from "../../style"
import ProductCard from "./ProductCard"
const CategoryCard = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-[300px] max-w-[450px] col-span-1">
      <div className="flex w-full items-center justify-between px-4">
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            Oturma Odası
        </p>
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            <i className="fa-solid fa-temperature-high text-red-800 font-light"></i>
        </p>
      </div>
      <div className="w-full grid grid-cols-4 grid-rows-8 gap-2">
        <ProductCard icon="fa-solid fa-faucet" name="Su" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-yellow-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Koltuk Işık" status="Açık" isIncludePercantage={false} rowSpan="row-span-8" colSpan="col-span-2" color="bg-green-600"/>
        <ProductCard icon="fa-solid fa-fire-flame-simple" name="Şömine" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-red-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Oda Lambasi" status="100" isIncludePercantage={true} rowSpan="row-span-4" colSpan="col-span-2" color="bg-blue-300" />
      </div>
    </div>
  )
}

export default CategoryCard
