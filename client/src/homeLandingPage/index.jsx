import styles from "../style"
import { Main, Navbar, } from "./components"

const HomeLandingPage = () => (
  <div className='bg-[#002f4f] w-full overflow-hidden'>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-[#fafafa] ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Main />
      </div>
    </div>   
  </div>
)

export default HomeLandingPage