import quality from "../assets/quality.png";

const OurPolicy = () => {

  return (
    <div className='flex flex-col gap-10 w-full mb-10'> 
        <div className='h-[150px] w-full bg-primary flex justify-center items-center'>
            <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Kalite</span><span className="border-b-2 border-r-2 pr-1"> Politikamız</span> </h2>
        </div>
        <div className='flex flex-col gap-5 w-full mx-4'>
          <p className="text-base">
          Üretim birimlerimizde yer alan kalite kontrol sistemlerimiz ile üretilen taşlar,dünya ve müşteri standartlarına uygun ve hazır hale getirilerek sevk edilmektedir.
          </p>
          <p>
          Canel Münip Çoker Madencilik; güncel ve gelişen teknolojiyi takip ederek,tüketici beklentilerini karşılayan Kalite Yönetim Sistemini , uluslar arası ISO9001 standardının gereklerini yerine getirecek şekilde belglelendirmiş olup, tüm süreçlerinde ki verimliliği arttırarak,TOPLAM KALİTE’ yi hedeflemiştir.</p>
            <img src={quality} alt="Marble Instute of America" className="w-max h-auto"/>
        </div>
    </div>
  )
}

export default OurPolicy