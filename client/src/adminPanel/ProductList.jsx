import { useDispatch, useSelector } from "react-redux";
import styles from "../style";
import { setProduct} from "../state";
import { useEffect } from "react";

const ProductList = () => {

    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const deleteProduct = async (id) => {
        const response = await fetch(`http://localhost:3003/product/delete-product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            console.log("product deleted successfully");
            getProduct();
        } else {
            console.error("Error deleting product:", data);
        }
    }

    const getProduct = async () => {
        const response = await fetch(`http://localhost:3003/product/product-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
        });
        const data = await response.json();
        dispatch(setProduct(data));
        console.log(data);
    };

    useEffect(() => {
        console.log(token)
        getProduct();
    }, [])

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
        <h2 className='text-white text-4xl font-light text-center'>Ürünler</h2>
        <p className='text-white'>— Ürünler - Tüm Ürünler</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full bg-accent text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-3">
                Ürün Resmi
              </th>
              <th scope="col" className="px-6 py-3">
                Ürün Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Ürün Kodu
              </th>
              <th scope="col" className="px-6 py-3">
                Ürün Tipi
              </th>
              <th scope="col" className="px-6 py-3">
                Düzenle
              </th>
              <th scope="col" className="px-6 py-3">
                Sil
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
            <tr key={product._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <td className="p-4">
                <img  src={`http://localhost:3003/uploads/${product.imagePath[0]}`} alt={product.name} className="w-[50px] h-[50px]" />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{product.code}</td>
              <td className="px-6 py-4">{product.type}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Düzenle
                </a>
              </td>
              <td className="px-6 py-4">
                <a 
                  className="font-medium text-error hover:underline cursor-pointer"
                  onClick={() => deleteProduct(product._id)} 
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

export default ProductList;
