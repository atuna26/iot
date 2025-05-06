import { useDispatch, useSelector } from "react-redux";
import styles from "../style";
import {setEvent} from "../state";
import { useEffect } from "react";

const EventList = () => {

    const event = useSelector((state) => state.event);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const deleteEvent = async (id) => {
        const response = await fetch(`http://localhost:3003/event/delete-event/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Event deleted successfully");
            getEvent();
        } else {
            console.error("Error deleting event:", data);
        }
    }

    const getEvent = async () => {
        const response = await fetch(`http://localhost:3003/event/event-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Fixed here
            },
        });
        const data = await response.json();
        dispatch(setEvent(data));
        console.log(data);
    };

    useEffect(() => {
        console.log(token)
        getEvent();
    }, [])

  return (
    <section className={`flex flex-col bg-secondary w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY} `}>
        <h2 className='text-white text-4xl font-light text-center'>Etkinlikler</h2>
        <p className='text-white'>— Etkinlikler - Tüm Etkinliker</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full bg-accent text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Etkinlik Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Etkinlik Tarihi
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
            {event.map((item) => (
            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.title}
              </th>
              <td className="px-6 py-4">{new Date(item.eventDate).toLocaleDateString()}</td>
              
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
                  className="font-medium text-error hover:underline"
                  onClick={() => deleteEvent(item._id)} 
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

export default EventList;
