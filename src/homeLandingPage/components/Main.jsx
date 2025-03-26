import styles from '../../style'
import CategoryCard from './CategoryCard'
const Main = () => {
  return (
    <section className={`flex sm:flex-row flex-col  w-full justify-end items-center ${styles.paddingY}`}>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        <CategoryCard name="Oturma Odası"/>
        <CategoryCard name="Menu 2"/>
        <CategoryCard name="Menu 3"/>
        <CategoryCard name="Menu 4"/>
        <CategoryCard name="Menu 5"/>
    </div>
  </section>
  )
}

export default Main
