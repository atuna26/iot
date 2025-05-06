import styles from "../../style";
import ocakPhoto from "../../assets/ocakphoto.jpg";
const Mine = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${ocakPhoto})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`flex flex-col w-full h-[250px] justify-center col-span-2 items-center gap-3`}
    >
      <h2 className="text-white text-3xl tracking-tight font-light pt-16 font-abel"> Ocaklarımız</h2>
      <p className="text-white text-lg font-light text-center px-3">
        Türkiye'nin önde gelen madencilik şirketlerinden olan Canel Münip Çoker
        Madencilik Bursa Kemalpaşa, Balıkesir Gönen, Manisa Akhisar bölgesindeki
        ocaklarıyla yıllık 100.000 m3 üretim kapasitesi ile çalışmalarına devam
        etmektedir.
      </p>
      <button
        type="button"
        className="text-primary border rounded-sm mt-2 bg-white border-white h focus:ring-4 focus:outline-none focus:ring-white-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Tüm Ocaklar
      </button>

      <div
        className={`flex md:flex-row flex-col w-full justify-center items-center gap-3 sm:pt-10 pt-3 `}
      ></div>
    </section>
  );
};

export default Mine;
