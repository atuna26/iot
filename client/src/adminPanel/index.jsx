import {Formik, Form, Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux"
import styles from '../style';

const AdminPanel = () => {

    const token = useSelector((state) => state.token)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        eventDate: Yup.date().required("Event date is required"),
    })

    const handleSubmit = async (values, {resetForm}) =>{
        const eventResponse = await fetch("http://localhost:3003/event/new-event",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        })
        const eventData = await eventResponse.json();
        if(eventResponse.ok){
            console.log("ok")
            resetForm();
        }
    }

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
      <h2 className='text-white text-4xl font-light text-center'>Etkinlikler</h2>
      <p className='text-white'>— Etkinlikler - Etkinlik Oluştur</p>
      <div className={` w-full justify-center items-center gap-3 sm:pt-10 pt-3`}>
        <Formik initialValues={{
            title: "",
            eventDate: "",
        }} onSubmit={handleSubmit} validationSchema={validationSchema}>

            {({isSubmitting})=>(
                <Form action='' className='grid grid-cols-2 w-full mt-2 gap-5'>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="title" className='text-white font-light'>Etkinlik Adı:</label>
                        <Field type="text" name="title" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="eventDate" className='text-white font-light'>Etkinlik Tarihi:</label>
                        <Field type="date" name="eventDate" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="eventDate" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button type='submit' className='bg-primary text-white rounded-md p-2 w-full col-span-2' disabled={isSubmitting}>
                        {isSubmitting ? "Oluşturuluyor..." : "Etkinliği Oluştur"}
                    </button>
                </Form>
            )}

        </Formik>
      </div>
    </section>
  )
}

export default AdminPanel