import styles from '../../style'
import CategoryCard from './CategoryCard'
const Main = () => {
  return (
    <section className={`flex sm:flex-row flex-col  w-full justify-end items-center ${styles.paddingY}`}>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
      <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
    </div>
  </section>
  )
}

export default Main
