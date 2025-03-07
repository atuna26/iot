import styles from "../style"

const LoginPage = () => {
  return (
    <div className="bg-white/50 backdrop-blur-md  w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth} ${styles.flexCenter} h-screen`}>
                <div className={`${styles.flexCenter} flex-col border-solid border-2 border-primary rounded-lg p-5 w-[400px] animate-glow-soft shadow-glow-soft`}>	
                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[32px] text-primary text-center
                    leading-[75px]">Welcome<br className="block"/>
                    <span className="text-gradient">Brain MRI System</span>
                </h1>
                    <form action="" className="flex flex-col w-full mt-2">
                        <label htmlFor="email" className={`${styles.paragraph} text-primary`}>Email</label>
                        <input type="email" name="email" id="email" className="border-solid border-2 border-primary rounded-md p-2 mt-2" />
                        <label htmlFor="password" className={`${styles.paragraph} text-primary mt-3`}>Password</label>
                        <input type="password" name="password" id="password" className="border-solid border-2 border-primary rounded-md p-2 mt-2" />
                        <div className="flex flex-row items-center py-[6px] mt-5 px-4 bg-discount-gradient rounded-[10px] mb-2 self-center cursor-pointer">
                            <p className={`${styles.paragraph}`}>
                                <span className="text-white mx-4">Login</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
