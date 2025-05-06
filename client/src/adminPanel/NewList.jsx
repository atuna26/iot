import { useDispatch, useSelector } from "react-redux";
import styles from "../style";
import {setNews} from "../state";
import { useEffect } from "react";

const NewList = () => {

    const news = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const deleteEvent = async (id) => {
        const response = await fetch(`http://localhost:3003/new/delete-new/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            console.log("New deleted successfully");
            getNews();
        } else {
            console.error("Error deleting event:", data);
        }
    }

    const getNews = async () => {
        const response = await fetch(`http://localhost:3003/new/new-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setNews(data));
        console.log(data);
    };

    useEffect(() => {
        console.log(token)
        getNews();
    }, [])

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
        <h2 className='text-white text-4xl font-light text-center'>Haberler</h2>
        <p className='text-white'>— Haberler - Tüm Haberler</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full bg-accent text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Haber Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Kısa Yazı
              </th>
              <th scope="col" className="px-6 py-3">
                Git
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
            {news.map((news) => (
            <tr key={news._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {news.title}
              </th>
              <td className="px-6 py-4">{news.shortText}</td>
                <td className="px-6 py-4">
                    <a
                    href={`localhost:3003/haberler/haber/${news._id}`}
                    className="font-medium text-accent hover:underline"
                    >
                    Git
                    </a>
                </td>
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
                  onClick={() => deleteEvent(news._id)} 
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

export default NewList;
