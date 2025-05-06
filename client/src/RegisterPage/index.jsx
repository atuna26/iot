import styles from "../style"
import loginBanner from "../assets/loginbanner.jpg"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import logoCanel from "../assets/logoCanel.png"

const RegisterPage = () => {
    const navigate = useNavigate()
    
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        companyName: Yup.string().required("Company Name is required")
    })

    const handleSubmit = async(values) => {
        console.log("submitted")
        const registerResponse = await fetch("http://85.95.244.99:8999/api/v1/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        navigate("/login")
    }

  return (
    <div style={{backgroundImage:`url(${loginBanner})`}} className={`w-full bg-cover bg-center h-screen overflow-hidden`}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth} ${styles.flexCenter} h-screen`}>
                <div style={{background: "rgba(255, 255, 255, 0.1)"}} className={`${styles.flexCenter} bg-white backdrop-blur-lg   flex-col border-solid border-2 border-primary rounded-lg p-5 w-[400px] animate-glow-soft shadow-glow-soft`}>	
                <img src={logoCanel} className='h-[80px] mt-2'/>
                <h1 className="flex-1 font-poppins font-semibold ss:text-[34px] text-[24px] text-white text-center
                    leading-[40px]">Hoş Geldiniz
                </h1>
                    <Formik initialValues={{name: "", email: "", phone: "", companyName: ""}} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({isSubmitting})=>(
                        <Form action="" className="flex flex-col w-full mt-2">
                            <label htmlFor="name" className={`${styles.paragraph} text-white`}>Name</label>
                            <Field type="text" name="name" id="name" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <label htmlFor="email" className={`${styles.paragraph} text-white pt-2`}>Email</label>
                            <Field type="email" name="email" id="email" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <label htmlFor="phone" className={`${styles.paragraph} text-white pt-2`}>Phone</label>
                            <Field type="text" name="phone" id="phone" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <label htmlFor="companyName" className={`${styles.paragraph} text-white pt-2`}>Company Name</label>
                            <Field type="text" name="companyName" id="companyName" className="border-solid border-2 border-white rounded-md p-2 mt-1" />
                            <div className="flex flex-row gap-1 justify-center pt-2">
                                <p className={`font-poppins font-normal text-white opacity-50 text-[15px] self-center`}>Zaten hesabın var mı? </p>
                                <p className="font-poppins opacity-100 text-[15px] self-centeropacity-100 text-white font-medium cursor-pointer" onClick={() => navigate("/login")}>Giriş yap</p> 
                            </div>
                            <button className="py-[6px] mt-5 px-4 bg-primary rounded-[10px] mb-2 text-white text-center w-[150px] self-center" type="submit" disabled={isSubmitting}>
                                Kayıt Ol
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

export default RegisterPage
