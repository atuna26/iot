import styles from "../../style"
import poverA from "../../assets/poverA.webp"
const BlockGallery = () => {
  return (
    <section className={`flex flex-col w-full justify-center items-center gap-3 pt-3`}>
      <h2 className='text-primary text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Blok</span><span className="border-b-2 border-r-2 pr-1"> Galeri</span> </h2>
    <div className="flex flex-row w-full justify-center items-center gap-3 sm:pt-10 pt-3 px-5">
    <div  style={{
                backgroundImage: `url(${poverA})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                }} className={`flex flex-col w-full justify-center items-center h-[450px]`}>
            
        </div>   
        <div  style={{
                backgroundImage: `url(${poverA})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                }} className={`flex flex-col w-full justify-center items-center h-[450px]`}>
            
        </div>    
        <div  style={{
                backgroundImage: `url(${poverA})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                }} className={`flex flex-col w-full justify-center items-center h-[450px]`}>
            
        </div>   
    </div>
    <button
        type="button"
        className="text-primary hover:text-white border rounded-sm mt-2 bg-white hover:bg-primary border-primary hover:border-white self-end mr-4  focus:ring-4 focus:outline-none focus:ring-white-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Tüm Bloklar
      </button>
    </section>
  )
}

export default BlockGallery