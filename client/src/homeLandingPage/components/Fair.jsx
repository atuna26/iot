import styles from '../../style'
import canelizmir22 from '../../assets/canelizmir22.jpg'
import canelizmir2024 from '../../assets/canelizmir2024.jpg'
import blackMarble from '../../assets/blackMarble.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setEvent, setReference } from '../../state'
import { useEffect } from 'react'


const Fair = () => {
  const dispatch = useDispatch();
  const references = useSelector((state) => state.reference);

  const event = useSelector((state) => state.event);
  const getEvent = async () => {
    const response = await fetch("http://localhost:3003/event/event-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    dispatch(setEvent(data));
  }
  const getReferences = async () => {
      const response = await fetch(`http://localhost:3003/reference/reference-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(setReference(data));
    }

  useEffect(() => {
    getEvent();
    getReferences();
  },[])


  return (
    <section className={`flex flex-col col-span-2 bg-white w-full justify-center shadow-2xl gap-3 px-20 ${styles.paddingY}`}>
      <h2 className='text-primary text-3xl font-medium tracking-wide font-abel '> <span className="border-t-2 border-l-2 pl-1">Fuarlar ve Etkinlikler </span> </h2>
      <div className={`md:grid md:grid-cols-5 flex flex-col  w-full gap-3 sm:pt-10 pt-3`}>
        <p className='text-primary col-span-2 text-lg font-normal '>Canel Münip Çoker Madencilik mermer sektörüne 1996 yılında <span className='font-bold'>Bursa</span> Bölgesinde başlamıştır.<br/>
        Daha sonra Susurluk, Akhisar ve Gönen bölgesinde bulunan ruhsatlarından üretimler yapılmıştır bu sayede Bej haricinde günümüzde moda olan Gri ve siyah mermerlerinizde üretim gamına katmışır.<br/>
        Özellikle <span className='font-bold'>Rain Gray</span> isimli mermerimiz gerek yurt içinde gerek yurt dışında çok önemli prestijli projelerde dizaynırların ve mimarların önde gelen tercihi olmuştur.</p>
        <div className='col-span-3 flex  flex-row justify-evenly w-full'>
          <img src={canelizmir2024} className='sm:w-[320px] w-[100px]' loading="lazy" alt="" />
          <img src={canelizmir22} className='sm:w-[320px] w-[100px]' loading="lazy" alt="" />
        </div>
      </div>
      <hr className='w-full border-1 border-primary my-5'/>
      <h2 className='text-primary text-2xl font-light font-abel'> <span className='font-medium'>—</span> Fuar Takvimi</h2>
      <div className='flex sm:flex-row flex-col justify-between items-center w-full gap-3 mt-2'>
        {event.slice(0,4).map((item) => (
          <div key={item._id} style={{backgroundImage:`url(${blackMarble})`}} className='flex flex-col justify-center items-center w-[250px] h-[100px] filter brightness-75 rounded-md'>
            <p className='text-center text-white font-semibold'>{item.title}</p>
            <p className='text-center text-white'>{new Date(item.eventDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <h2 className='text-primary text-2xl font-light font-abel pt-5'> <span className='font-medium'>—</span> Referanslar</h2>
      <div className={`flex flex-row w-full justify-start items-center gap-3 overflow-hidden`}>
            <div className={`flex animate-scroll`}>
            {references.map((reference) => (
          
          <img key={reference._id} src={`http://localhost:3003/uploads/${reference.imagePath}`} loading='lazy' alt={reference.title}
           className="w-48 h-48 mx-4" />

        ))}
            </div>
          </div>
      
      
    </section>
  )
}

export default Fair