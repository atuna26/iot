import styles from '../../style'
import whiteMarble from '../../assets/whiteMarble.jpg'
import blackMarble from '../../assets/blackMarble.jpg'

const Product = () => {
  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY}`}>
      <h2 className='text-white text-4xl font-light '> <span className='font-medium'>—</span>Mermerlerimiz</h2>
      <div className={`flex md:flex-row flex-col w-full justify-center items-center gap-3 sm:pt-10 pt-3`}>
        <div className='flex flex-col bg-primary w-full px-3 pt-7 items-start gap-3 glassDiv'>
          <h3 className='text-white text-2xl font-normal'>Mermer Plaka</h3>
          <hr className='w-full border-t-2 border-white opacity-20' />
         <div className='grid grid-cols-3 grid-rows-2 gap-3 w-full pb-2'>
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
         </div>
        </div>
        <div className='flex flex-col bg-primary w-full px-3 pt-7 items-start gap-3 glassDiv'>
          <h3 className='text-white text-2xl font-normal'>Mermer Fayans</h3>
          <hr className='w-full border-t-2 border-white opacity-20' />
         <div className='grid grid-cols-3 grid-rows-2 gap-3 w-full pb-2'>
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
          <img src={whiteMarble} alt="" />
         </div>
        </div>
      </div>
    </section>
  )
}

export default Product