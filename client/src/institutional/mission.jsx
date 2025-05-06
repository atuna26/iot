
const MissionAndVision = () => {

  return (
    <div className='flex flex-col gap-10 w-full mb-10'> 
        <div className='h-[150px] w-full bg-primary flex justify-center items-center'>
            <h2 className='text-white text-3xl font-light font-abel'> <span className="border-t-2 border-l-2 pl-1">Misyon </span> & <span className="border-b-2 border-r-2 pr-1"> Vizyon</span> </h2>
        </div>
        <div className='flex flex-col gap-5 w-full mx-4'>
            <h2 className="text-lg font-bold">Misyon</h2>
          <p className="text-base">
          Ülkemizde bulunan doğaltaş potansiyelini kullanarak toplam kalite yönetiminden ayrılmadan müşterilerimizin istek ve ihtiyaçlarını tam anlamıyla karşılayıp mevcut Pazar payını arttırmak ve ülke ekonomisine katkı sağlamaktadır.</p>
            <h2 className="text-lg font-bold">Vizyon</h2>
          <p>
          Firmamızı yeni yatırımlarla daha da geliştirip, yeni pazarlara açılmak ve ülkemizin değerli kaynaklarını en iyi şekilde işleyerek hak ettiği ekonomik değere kavuşturmaktır.
        </p>
        </div>
    </div>
  )
}

export default MissionAndVision