import styles from "../style"
import loginBanner from "../assets/loginbanner.jpg"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch} from "react-redux"
import { setLogin } from "../state"
import logoCanel from "../assets/logoCanel.png"


const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        email: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    })

    const handleSubmit = async(values) => {
        console.log("submitted")
        const loginResponse = await fetch("http://localhost:3003/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const loggedIn= await loginResponse.json()
        if(loggedIn){
            dispatch(setLogin({
                token: loggedIn.token
            }))
        }
        navigate("/admin-panel")
    }

  return (
    <div style={{backgroundImage:`url(${loginBanner})`}} className={`w-full bg-cover bg-center h-screen overflow-hidden`}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth} ${styles.flexCenter} h-screen`}>
                <div style={{background: "rgba(255, 255, 255, 0.1)"}} className={`${styles.flexCenter} bg-white backdrop-blur-lg   flex-col border-solid border-2 border-primary rounded-lg p-5 w-[400px] animate-glow-soft shadow-glow-soft`}>	
                <img src={logoCanel} className='h-[80px] mt-2'/>
                <h1 className="flex-1 font-poppins font-semibold ss:text-[34px] text-[24px] text-white text-center
                    leading-[40px]">Tekrar,<br className="block"/>Hoş Geldin
                    
                </h1>
            
                    <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({isSubmitting})=>(
                        <Form action="" className="flex flex-col w-full mt-2">
                            <label htmlFor="email" className={`${styles.paragraph} text-white pt-2`}>Email</label>
                            <Field type="email" name="email" id="email" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <label htmlFor="password" className={`${styles.paragraph} text-white pt-2`}>Password</label>
                            <Field type="password" name="password" id="password" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <button className="py-[6px] mt-5 px-4 bg-primary rounded-[10px] mb-2 text-white text-center w-[150px] self-center" type="submit" disabled={isSubmitting}>
                                Giriş yap
                            </button>
                        </Form>
                        )}
                        
                    </Formik>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
