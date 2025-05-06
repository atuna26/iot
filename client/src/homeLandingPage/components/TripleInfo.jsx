import styles from '../../style'
import gradientBg from "../../assets/gradientBg.jpg"
import brownBanner from "../../assets/brownBanner.png"

const TripleInfo = () => {
  return (
    <section style={{backgroundImage:`url(${brownBanner})`}} className={`flex flex-col w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY}`}>
      <h2 className='text-white text-4xl font-light'> <span className='font-medium'>—</span>  Hakkımızda</h2>
      <div className={`flex md:flex-row flex-col w-full justify-center items-center gap-3 sm:pt-10 pt-3`}>
        <div className='flex flex-col bg-primary w-full pl-3 py-10 items-start gap-14 glassDiv'>
          <h3 className='text-white text-2xl font-normal'>Inovatif Yaklaşım</h3>
          <p className='text-white text-lg font-normal opacity-70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet commodi placeat culpa aut obcaecati. Facilis inventore sit odio consequuntur fuga ut perferendis architecto, atque reprehenderit.</p>
        </div>
        <div className='flex flex-col bg-primary w-full pl-3 py-10 items-start gap-14 glassDiv'>
          <h3 className='text-white text-2xl font-normal'>Inovatif Yaklaşım</h3>
          <p className='text-white text-lg font-normal opacity-70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet commodi placeat culpa aut obcaecati. Facilis inventore sit odio consequuntur fuga ut perferendis architecto, atque reprehenderit.</p>
        </div>
        <div className='flex flex-col bg-primary w-full pl-3 py-10 items-start gap-14 glassDiv'>
          <h3 className='text-white text-2xl font-normal'>Inovatif Yaklaşım</h3>
          <p className='text-white text-lg font-normal opacity-70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet commodi placeat culpa aut obcaecati. Facilis inventore sit odio consequuntur fuga ut perferendis architecto, atque reprehenderit.</p>
        </div>
      </div>
    </section>
  )
}

export default TripleInfo