import styles from "../../style";
import factoryPhoto from "../../assets/factoryPhoto.jpg";
const Factory = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${factoryPhoto})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`flex flex-col w-full h-[250px] justify-center col-span-2 items-center gap-3 `}
    >
      <h2 className="text-white text-3xl font-light pt-16 tracking-tight font-abel"> Fabrikalarımız</h2>
      <p className="text-white text-lg  text-center px-3 font-light">
      Her bir ürünümüz blok olarak oluşumundan, en son gerçekleştirilen sevkiyat öncesi kontrollerine kadar dünya standartlarındaki fabrikalarımızdan sizlere ulaşmaktadır.
      </p>
      <button
        type="button"
        className="text-primary border rounded-sm mt-2 bg-white border-white h focus:ring-4 focus:outline-none focus:ring-white-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Tüm Fabrikalar
      </button>

      <div
        className={`flex md:flex-row flex-col w-full justify-center items-center gap-3 sm:pt-10 pt-3 `}
      ></div>
    </section>
  );
};

export default Factory;
