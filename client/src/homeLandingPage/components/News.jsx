import { useDispatch, useSelector } from 'react-redux'
import newMachine from '../../assets/newMachine.jpeg'
import pandrosa from '../../assets/pandrosa.jpeg'
import { setNews } from '../../state';
import { useEffect } from 'react';
const News = () => {
    const news = useSelector((state) => state.news);
    const dispatch = useDispatch();

    const getNews = async () => {
        const response = await fetch(`http://localhost:3003/new/new-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        dispatch(setNews(data));
    }

    useEffect(() => {
        getNews();
    },[])

  return (
    <section className="flex flex-col col-span-2 bg-black w-full items-start gap-3 pt-5 overflow-hidden">
        <h2 className='text-white text-3xl font-light font-abel self-center'> <span className="border-t-2 border-l-2 pl-1">Canel'den</span><span className="border-b-2 border-r-2 pr-1"> Haberler</span> </h2>
        <div className="flex flex-row items-center gap-3 py-3 mx-5">
            {news.slice(0,4).map((item) => (
                <div key={item._id} style={{
                    backgroundImage: `url(http://localhost:3003/uploads/${item.imagePath})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    }} className={`flex flex-row justify-center items-end w-[350px] h-[220px]`}>
                    <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} className='w-full h-[50%]'>
                        <p className='text-start text-white font-semibold pt-2 text-xl font-poppins px-2'>{item.title}</p>
                        <p className='text-start text-white font-poppins text-sm px-2'>{item.shortText}</p>
                    </div>
                    
                </div>
               
            ))}
        </div>

    </section>
  )
}

export default News