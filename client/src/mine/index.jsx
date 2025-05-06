import { useState } from "react";
import ocakA from "../assets/ocakA.jpg";
import ocakB from "../assets/ocakB.jpg";
import ocakC from "../assets/ocakC.jpg";
import ocakD from "../assets/ocakD.jpeg";
import ocakE from "../assets/ocakE.jpeg";
import ocakF from "../assets/ocakF.jpg";
import ocakPhoto from "../assets/ocakphoto.jpg";

const Mine = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    {id:1,src:ocakA, alt:"Madencilik Ocak Fotoğrafı"},
    {id:2,src:ocakB, alt:"Madencilik Ocak Fotoğrafı"},
    {id:3,src:ocakC, alt:"Madencilik Ocak Fotoğrafı"},
    {id:4,src:ocakD, alt:"Madencilik Ocak Fotoğrafı"},
    {id:5,src:ocakE, alt:"Madencilik Ocak Fotoğrafı"},
    {id:6,src:ocakF, alt:"Madencilik Ocak Fotoğrafı"},
  ]

  const openModal = (image) => {
    setSelectedImage(image);
  }

  const closeModal = () => {
    setSelectedImage(null);
  }


  return (
    <div className='flex flex-col gap-10 w-full'> 
        <div  style={{
                backgroundImage: `url(${ocakPhoto})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }} className='h-[150px] w-full bg-primary flex justify-center items-center'>
            <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Ocaklar</span></h2>
        </div>
        <div className='flex flex-col gap-5 w-full mx-4'>
          <p>Türkiye'nin önde gelen madencilik şirketlerinden biri olan Canel Madencilik 1996 yılından bu yana Bursa' da bulunan ocaklarında (M.Kemalpaşa,Sincansarnıç) 100,000 m3'den fazla mermer(Emperador, Crema Barla, Bursa Beige, Sugar, Rosa Beige) üretimi gerçekleşmiştir.</p>
          <ol className="list-disc list-inside">
            <li><span className="font-bold">Kemalpaşa:</span> Kemalpaşa ocağımız Sincasarnıç köyu,Söğütalan mevkii Kemalpaşa Bursada yer almaktadır. Türkiyenin lider üretici firmalarından biri olan Canel madencilik, 1996 yılından beri yüksek katlitedeki mermer üretimini gerçekleştirmektedir. Her yıl 30.000 m3 mermer blok üretimi gerçekleştiren Canel madencilik ; Bursa, M. Kemalpasa, Sincansarniç ve Gönen ocaklarında <span className="font-bold"> Emperador, Crema Barla, Bursa Beige, Sugar beige Rosa Beige fume emperador </span> isimli ürünlerini üreterek 70 Dünya ülkesine ihrac etmektedir.  </li>
            <li><span className="font-bold">İnegazi:</span> İnegazi ocağımız Çalı İnegazi bölgesinde yer almaktadır,2005 yılında açılmış olan ocağımızda <span className="font-bold">Emperador ve Bursa Beige</span> üretilmektedir.</li>
            <li><span className="font-bold">Unçukuru:</span> Unçukuru ocağımız; Unçukuru köyü,Söğütalan bölgesinde yer alır. 2006 yılı sonunda faaliyete gecen ocağımızda <span className="font-bold"> Emperador,Crema Barla ve Bursa Beige </span> ürünleri üretilmektedir. </li>
            <li><span className="font-bold">Akhisar:</span> Akhisar ocağımız Evkafteke köyü Akhisar bölgesinde yer almaktadır. Ürün : <span className="font-bold"> Koyu Emperador</span></li>
            <li><span className="font-bold">Susurluk:</span> <span className="font-bold">Carresi Nero</span> ocağımzıdır. Korucaoluk Köyü, Susurluk/Balıkesir’de yer almaktadır.</li>
            <li><span className="font-bold">Dursunbey:</span><span className="font-bold">CX51 Traverten ocağımız.</span> Alagüney Village, Dursunbey/Balıkesir’de yer almaktadır.</li>
            <li><span className="font-bold">Gönen:</span> <span className="font-bold">Fume emperador</span> ürünümüzün yer aldığı ocağımız Fındıklı Köyü Gönende bulunmaktadır.</li>
          </ol>
        </div>
        <div className='flex justify-evenly items-center flex-wrap gap-5'>
          {images.map((image) => (
            <img key={image._id} src={image.src} alt={image.alt} className='w-[300px] h-[300px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer' 
              onClick={() => openModal(image)}
            />
          ))}
        </div>


        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-[80vh] object-contain mx-auto" />
          </div>
        )}
    </div>
  )
}

export default Mine