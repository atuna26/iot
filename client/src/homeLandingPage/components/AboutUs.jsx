import styles from '../../style'
import cnlbanner from "../../assets/cnlbanner.png"

const AboutUs = () => {
  return (
    <section className={`flex flex-col w-full bg-gray justify-center items-center shadow-2xl ${styles.paddingY}`}>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-row items-start'>
            <h1 className='text-2xl font-light text-primary tracking-tighter'>01</h1>
            <div className='flex flex-col'>
              <h3>Access to Enterprise</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus necessitatibus consectetur facere neque sunt modi.</p>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <h1 className='text-2xl font-light text-primary tracking-tighter'>01</h1>
            <div className='flex flex-col justify-center items-center'>
              <h3>Access to Enterprise</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus necessitatibus consectetur facere neque sunt modi.</p>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <h1 className='text-2xl font-light text-primary tracking-tighter'>01</h1>
            <div className='flex flex-col justify-center items-center'>
              <h3>Access to Enterprise</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus necessitatibus consectetur facere neque sunt modi.</p>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <h1 className='text-2xl font-light text-primary tracking-tighter'>01</h1>
            <div className='flex flex-col justify-center items-center'>
              <h3>Access to Enterprise</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus necessitatibus consectetur facere neque sunt modi.</p>
            </div>
          </div>

        </div>
    </section>
  )
}

export default AboutUs