import canelKonum from "../assets/canelKonum.jpg"

const Institutional = () => {

  return (
    <div className='flex flex-col gap-10 w-full mb-10'> 
        <div className='h-[150px] w-full bg-primary flex justify-center items-center'>
            <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Firma</span><span className="border-b-2 border-r-2 pr-1"> Hakkında</span> </h2>
        </div>
        <div className='flex flex-col gap-5 w-full mx-4'>
          <p className="text-base">
          Canel Münip Çoker Madencilik, 1973 yılında, Sayın Munip Çoker tarafından, İstanbul’da şehir içi hafriyat hizmetleri vermek amacıyla kurulmuştur.
          </p>
          <p>
          Artan iş hacmi ve gelişen makine parkı, şirketin 80’li yılların başında İstanbul Akpınar bölgesinde kömür madenciliğine ve sonraki yıllarda kömür ile birlikte kum üretimine başlamasını sağlamıştır.
          </p>
          <div className="flex flex-row w-full ">
            <div className="flex flex-col gap-5">
              <p>
              İstanbul Akpınar Tesislerindeki madencilik faaliyetleri, bölgenin zorlu coğrafi yapısı gereği, dünyada ilk kez Canel Munip Çok Madencilik tarafından uygulanan, denize doğru dolgu setler yapılarak “deniz içi açık işletme yöntemi” ile gerçekleştirilmiştir. Bu yöntem ülke madenciliği için son derece önemli bir dönüm noktası olmuş, bölgede yıllardır üretilemeyeceği düşünülen, milyonlarca tonluk kömür bu sayede ülke ekonomisine kazandırılmıştır. İlk olarak Sayın Munip Çoker tarafından uygulanan bu üretim şekli, gerek Canel Munip Çoker Madencilik gerekse bölge madencileri tarafından geliştirilerek halen kullanılmaktadır.
              </p>
              <p>
              Canel Münip Çoker Madencilik, gelişimini, 1996 yılında Bursa’da satın alınan mermer sahalarında yaptığı mermer üretimi ve ihracatı ile sürdürmüş, mermer sektöründeki gelişmelere paralel olarak, o dönemde “ilk ocak içi fabrika”olan Bursa Kemalpaşa’daki Canel Mermer Kesme İşleme Fabrika’sını kurmuştur.
              </p>
              <p>
              Yeni mermer ruhsatlarının alımı, Bandırma Fayans, Plaka, Mozaik Fabrika’sının açılması ve farklı üretim hatları ile yeni yerine taşınması gibi, arka arkaya gelen önemli ve büyük yatırımlar, Canel Madencilik’in sektördeki istikrarlı büyümesini sürdürmüştür.
              </p>
              <p>
              Bu gelişimin sonucunda; Canel Madencilik, öncelikle müşteri memnuniyetini sağlama ve dış pazarları geliştirme amacı ile ISO Kalite Belgesi ve CE belgelerini almıştır.
              </p>
            </div>
              <img src={canelKonum} alt="" className="w-100 h-100" />
          </div>
          <p>
          Canel Munip Çoker Madencilik; yıllar boyu edinilmiş mesleki ve ticari yapısı, CANEL markası ve CANEL Münip Çoker Madencilik Tic. ve San. A.Ş. ünvanı ile İstanbul Akpınar bölgesinde kömür ve kum, Güney Marmara bölgesinde 15 sahada farklı renk ve özellikte mermer üretimi yaparak faaliyetlerini sürdürmektedir.
          </p>
          <p>
          Firmamız, 38 yıllık bilgi birikimi , kurum kültürü, çevreye ve yasal düzenlemelere olan duyarlığı ile toplumun ihtiyaç ve beklentilerini karşılayarak ülke ekonomisi ve istihdama katkı sağlamaktadır. Tüm dünyada büyük ilgi ve beğeni gören ürünlerini ABD, Avustralya, Arnavutluk, Mısır, Kanada, Çin, Belçika, İsrail, Hindistan, Bulgaristan, Ürdün, Japonya, Almanya, Lübnan, Yeni Zelenda, Hollanda, Libya, Singapur, İtalya, Arabistan, Sri Lanka, Romanya, Birleşik Arap Emirlikleri, Azerbeycan, Gürcistan, Vietnam, İngiltere, Hong Kong ve Rusya’ya ihraç etmektedir.
          </p>
         
        </div>
    </div>
  )
}

export default Institutional