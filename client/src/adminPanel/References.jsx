import { useDispatch, useSelector } from "react-redux";
import styles from "../style";
import { setReference} from "../state";
import { useEffect } from "react";

const ReferenceList = () => {

    const reference = useSelector((state) => state.reference);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const deleteReference = async (id) => {
        const response = await fetch(`http://localhost:3003/reference/delete-reference/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            getProduct();
        } else {
            console.error("Error deleting reference:", data);
        }
    }

    const getProduct = async () => {
        const response = await fetch(`http://localhost:3003/reference/reference-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
        });
        const data = await response.json();
        dispatch(setReference(data));
        console.log(data);
    };

    useEffect(() => {
        console.log(token)
        getProduct();
    }, [])

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
        <h2 className='text-white text-4xl font-light text-center'>Referanslar</h2>
        <p className='text-white'>— Referanslar - Tüm Referanslar</p>
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full bg-accent text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-3">
                Referans Resmi
              </th>
              <th scope="col" className="px-6 py-3">
                Referans Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Sil
              </th>
            </tr>
          </thead>
          <tbody>
            {reference.map((reference) => (
            <tr key={reference._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <td className="p-4">
                <img src={`http://localhost:3003/uploads/${reference.imagePath}`}  alt="" className="w-[50px] h-[50px]" />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {reference.title}
              </th>
              <td className="px-6 py-4">
                <a 
                  className="font-medium text-error hover:underline cursor-pointer"
                  onClick={() => deleteReference(reference._id)} 
                >
                  Sil
                </a>
              </td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReferenceList;
