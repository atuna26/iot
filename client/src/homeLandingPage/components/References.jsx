import { useDispatch, useSelector } from 'react-redux';
import { setReference } from '../../state';
import { useEffect } from 'react';

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
    console.log(data);
    dispatch(setReference(data));
  }
  
  useEffect(() => {
    getReferences();
  }
  , [])

  return (
    <section className={`flex flex-col w-full col-span-2 justify-center  gap-3 px-20 sm:py-10 py-4`}>
    <h2 className='text-primary text-4xl font-light'> <span className='font-medium'>—</span> Referanslar</h2>
    <div className={`flex flex-row w-full justify-start items-center gap-3 sm:pt-10 pt-3 overflow-hidden`}>
      <div className={`flex animate-scroll`}>
        {references.map((reference) => (
          
          <img key={reference._id} src={`http://localhost:3003/uploads/${reference.imagePath}`} alt={reference.title}
           className="w-48 h-48 mx-4" />

        ))}
      </div>
    </div>
  </section>
  )
}

export default References