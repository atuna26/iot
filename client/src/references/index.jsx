import { useDispatch, useSelector } from "react-redux"
import { setReference } from "../state";
import { useEffect } from "react";

const References = () => {

  const references = useSelector((state) => state.reference);
  const dispatch = useDispatch();

  const getReferences = async () => {
    const response = await fetch(`http://localhost:3003/reference/reference-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setReference(data));
  }

  useEffect(() => {
    getReferences();
  }
  , [])

  return (
    <div className='flex flex-col gap-10 w-full'> 
    <div className='h-[150px] w-full bg-primary flex justify-center items-center'>
        <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Tüm</span><span className="border-b-2 border-r-2 pr-1"> Ürünler</span> </h2>
    </div>
    <div className='flex flex-row flex-wrap w-full gap-5 '>
      {references.map((item) => (
        <div key={item._id} className='flex flex-col justify-center items-center border border-primary/25 px-2 pt-2'>
          <img src={`http://localhost:3003/uploads/${item.imagePath}`}  className='w-[178px] h-[178px]' alt="" />
          <p className='text-center self-center text-sm font-thin text-primary' >{item.title} </p>
        </div>
      ))}
    </div>
</div>
  )
}

export default References