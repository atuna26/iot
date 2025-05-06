import React, { useEffect } from 'react'
import blackMarble from '../assets/blackMarble.jpg'
import whiteMarble from '../assets/whiteMarble.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct } from '../state'

const AllProducts = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const getProduct = async () => {
    const response = await fetch ("http://localhost:3003/product/product-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    dispatch(setProduct(data));
    console.log(data);
  }

  useEffect(()=>{
    getProduct();
  },[])

  return (
    <div className='flex flex-col gap-10 w-full'> 
        <div className='h-[150px] w-full bg-primary flex justify-center items-center'>
            <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Tüm</span><span className="border-b-2 border-r-2 pr-1"> Ürünler</span> </h2>
        </div>
        <div className='flex flex-row gap-5 flex-wrap w-full mx-4'>
          {product.map((item) => (
            <div key={item._id} className='flex flex-col justify-center items-center border border-primary px-2 pt-2'>
              <img src={`http://localhost:3003/uploads/${item.imagePath[0]}`}  className='w-[180px] h-[180px] filter brightness-75' alt="" />
              <p className='text-center text-primary font-semibold'>{item.name}</p>
              <p className='text-end self-end text-sm font-thin text-primary cursor-pointer' onClick={()=>props.setItems(item.code)} >Karşılaştır </p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AllProducts