import {Formik, Form, Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux"
import styles from '../style';

const NewProduct = () => {

    const token = useSelector((state) => state.token)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        code: Yup.string().required("Code is required"),
        describe: Yup.string().required("Description is required"),
        type: Yup.string().required("Type is required"),
        images: Yup.array().required("At least one image is required"),
    })

    const handleSubmit = async (values, {resetForm}) =>{
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("code", values.code);
        formData.append("describe", values.describe);
        formData.append("type", values.type);

        for (let i = 0; i < values.images.length; i++) {
            formData.append("images", values.images[i]);
        }

        const response = await fetch("http://localhost:3003/product/new-product", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Product created:", result);
            resetForm();
        } else {
            console.error("Failed to create product", result);
        }
    }

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
      <h2 className='text-white text-4xl font-light text-center'>Ürünler</h2>
      <p className='text-white'>— Ürünler - Ürün Ekle</p>
      <div className={` w-full justify-center items-center gap-3 sm:pt-10 pt-3 border border-gray-300 rounded-lg shadow-2xl p-3`}>
        <Formik initialValues={{
            name: "",
            code:"",
            describe:"",
            type:"",
            images: [],
        }} onSubmit={handleSubmit} validationSchema={validationSchema}>

            {({isSubmitting,setFieldValue})=>(
                <Form action='' className='grid grid-cols-2 w-full mt-2 gap-5'>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="name" className='text-white font-light'>Ürün Adı:</label>
                        <Field type="text" name="name" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="code" className='text-white font-light'>Ürün Kodu:</label>
                        <Field type="text" name="code" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor="images" className='text-white font-light block mb-2 text-sm'>Ürün Resmi:</label>
                        <input type="file" name="images" onChange={(event) => setFieldValue("images",Array.from(event.currentTarget.files))} className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray focus:outline-none' multiple />
                        <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                    </div>
                    
                    <div className='flex flex-row gap-2 w-full'>
                        <label htmlFor='type' className='text-white font-light'>Ürün Türü:</label>
                        <Field as="select" name="type" className='rounded-md p-2 w-full'>
                            <option value="" disabled>Seçiniz</option>
                            <option value="Pavel">Pavel</option>
                            <option value="Blok">Blok</option>
                            <option value="Plaka">Plaka</option>
                            <option value="Ebatli">Ebatlı</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='flex flex-row gap-2 col-span-2 w-full'>
                        <label htmlFor="describe" className='text-white font-light'>Ürün Açıklaması:</label>
                        <Field type="text" name="describe" className='rounded-md p-2 w-full' />
                        <ErrorMessage name="describe" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button type='submit' className='bg-primary text-white rounded-md p-2 w-full col-span-2' disabled={isSubmitting}>
                        {isSubmitting ? "Oluşturuluyor..." : "Ürünü oluştur"}
                    </button>
                </Form>
            )}

        </Formik>
      </div>
    </section>
  )
}

export default NewProduct