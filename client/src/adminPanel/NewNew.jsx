import {Formik, Form, Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux"
import styles from '../style';

const NewNew = () => {

    const token = useSelector((state) => state.token)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        shortText: Yup.string().required("Short Text is required"),
        text: Yup.string().required("Text is required"),
        image: Yup.mixed().required("At least one image is required"),
    })

    const handleSubmit = async (values, {resetForm}) =>{
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("shortText", values.shortText);
        formData.append("text", values.text);
        formData.append("image",values.image);
        const response = await fetch("http://localhost:3003/new/new-new", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            console.log("New created:", result);
            resetForm();
        } else {
            console.error("Failed to create new", result);
        }
    }

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
      <h2 className='text-white text-4xl font-light text-center'>Haberler</h2>
      <p className='text-white'>— Haberler - Haber Ekle</p>
      <div className={` w-full justify-center items-center gap-3 sm:pt-10 pt-3 border border-gray-300 rounded-lg shadow-2xl p-3`}>
        <Formik initialValues={{
            title: "",
            shortText:"",
            text:"",
            image:null,
        }} onSubmit={handleSubmit} validationSchema={validationSchema}>

            {({isSubmitting,setFieldValue})=>(
                <Form action='' className='grid grid-cols-2 w-full mt-2 gap-5'>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="title" className='text-white font-light'>Haber Adı:</label>
                        <Field type="text" name="title" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="image" className='text-white font-light block mb-2 text-sm'>Haber Resmi:</label>
                        <input type="file" name="image" onChange={(event) => setFieldValue("image",event.currentTarget.files[0])} className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray focus:outline-none' multiple />
                        <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 col-span-2 w-full'>
                        <label htmlFor="shortText" className='text-white font-light'>Kısa yazı</label>
                        <Field type="text" name="shortText" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="shortText" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 col-span-2 w-full'>
                        <label htmlFor="text" className='text-white font-light'>Yazı:</label>
                        <Field type="text" name="text" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button type='submit' className='bg-primary text-white rounded-md p-2 w-full col-span-2' disabled={isSubmitting}>
                        {isSubmitting ? "Oluşturuluyor..." : "Haber oluştur"}
                    </button>
                </Form>
            )}

        </Formik>
      </div>
    </section>
  )
}

export default NewNew