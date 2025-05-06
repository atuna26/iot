import slabGalleryA from "../../assets/slabGalleryA.png"

const SlabGallery = () => {
  return (
    <section className={`flex flex-col w-full justify-center items-center gap-3`}>
      <h2 className='text-primary text-3xl font-medium tracking-wide font-abel'> <span className="border-t-2 border-l-2 pl-1">Plaka </span><span className="border-b-2 border-r-2 pr-1"> Galeri</span></h2>
      <div className={`flex md:flex-row flex-col w-full justify-center items-center gap-3 `}>
        <img src={slabGalleryA} className="w-[180px] h-[350px]" loading="lazy" alt="" />
        <img src={slabGalleryA} className="w-[180px] h-[350px]" loading="lazy" alt="" />
        <img src={slabGalleryA} className="w-[180px] h-[350px]" loading="lazy" alt="" />
      </div>    
      <button
        type="button"
        className="text-primary hover:text-white border rounded-sm mt-2 bg-white hover:bg-primary border-primary hover:border-white self-end mr-4  focus:ring-4 focus:outline-none focus:ring-white-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Tüm Fayanslar
      </button>
    </section>
  )
}

export default SlabGallery