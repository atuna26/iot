import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setDevices } from "../../state";

const Scenario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScenarioModal,setHasScenarioModal] = useState(false);
  const [hasScenarioModalText,setHasScenarioModalText] = useState("")
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);

  const getDevicesList = async () => {
       const response = await fetch("http://85.95.244.99:8999/api/v1/templates/all-device-templates",{
         method: "GET",
         headers: {Authorization: `Bearer ${token}`}
       });
       const data = await response.json();
       console.log(data);
       dispatch(setDevices(data));
     }

     useEffect(() => {
      getDevicesList();
     },[])  

     const serialNumberCheck = async (serialNumber)=> {
      const response = await fetch(`http://85.95.244.99:8999/api/v1/scenarios/info?serialNumber=${serialNumber}`,{
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
      const data = await response.json();
      if(data.hasScenario){
        setHasScenarioModal(true);
        setHasScenarioModalText(data.message)
     }
    }

  const handleBackdropClick = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    const response = await fetch(
      "http://85.95.244.99:8999/api/v1/scenarios/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    setIsModalOpen(false);
  };

  return (
    <section
      className={`flex sm:flex flex-col w-full items-center sm:py-10 py-6`}
    >
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400 overflow-hidden rounded-b-lg shadow-lg">
          <caption className="caption-top text-center font-semibold text-white text-base md:text-xl lg:text-2xl rounded-t-lg bg-primary py-3 md:py-6">
            <div className="w-full relative flex justify-center items-center">
              <p>Tüm Senaryolar</p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute right-0 text-white bg-primary font-medium rounded-lg text-base px-5 py-2.5 me-2 border border-white"
              >
                Yeni Senaryo
              </button>
            </div>
          </caption>
          <thead className="bg-primary">
            <tr>
              <th className="border border-x-gray-300 border-b-gray-300 p-2 md:p-4 pl-4 md:pl-8 text-left font-bold text-white whitespace-nowrap">
                Senaryo Id
              </th>
              <th className="border border-x-gray-300 border-b-gray-300 p-2 md:p-4 pl-4 md:pl-8 font-bold text-white whitespace-nowrap text-center">
                Senaryo Adı
              </th>
              <th className="border border-x-gray-300 border-b-gray-300 p-2 md:p-4 pl-4 md:pl-8  font-bold text-white whitespace-nowrap text-center">
                Cihaz Seri Numarası
              </th>
              <th className="border border-x-gray-300 border-b-gray-300 p-2 md:p-4 pl-4 md:pl-8 text-left font-bold text-white whitespace-nowrap">
                Düzenle
              </th>
              <th className="border border-x-gray-300 border-b-gray-300 p-2 md:p-4 pl-4 md:pl-8 text-left font-bold text-white whitespace-nowrap">
                Sil
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white p-6 pt-0 rounded-lg shadow-lg flex flex-col items-center justify-between  w-[900px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-between w-full pt-2">
              <h2 className="text-xl font-bold">Yeni Senaryo</h2>
              <Formik
                initialValues={{
                  serialNumber: "",
                  name: "",
                  trigger: {
                    serialNumber: "",
                    condition_key: "",
                    operator: "",
                    value: "",
                  },
                  actions: [
                    {
                      serialNumber: "",
                      command: "",
                      parameters: {},
                    },
                  ],
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting,values, setFieldValue }) => (
                  <Form action="" className="flex flex-col w-full mt-2">
                    <div className="flex flex-row w-full gap-4">
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="serialNumber"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Seri Numarası
                        </label>
                        <Field
                        as="select"
                        name="serialNumber"
                        id="serialNumber"
                        onChange={(e) => {serialNumberCheck(e.target.value); setFieldValue("serialNumber", e.target.value)}}
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="">Seçiniz</option>
                        {devices.map((device) => (
                          <option key={device.serialNumber} value={device.serialNumber}>
                            {device.serialNumber}
                          </option>
                        ))}
                      </Field>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="name"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Senaryo Adı
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="border-solid border-2 border-gray disabled:bg-gray  rounded-md p-2 mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-4">
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="trigger.serialNumber"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Tetik Seri Numarası
                        </label>
                        <Field
                        as="select"
                        name="trigger.serialNumber"
                        id="trigger.serialNumber"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="">Seçiniz</option>
                        {devices.map((device) => (
                          <option key={device.serialNumber} value={device.serialNumber}>
                            {device.serialNumber}
                          </option>
                        ))}
                      </Field>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="trigger.condition_key"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Kontrol Elemanı
                        </label>
                        <Field
                        as="select"
                        name="trigger.condition_key"
                        id="trigger.condition_key"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="">Seçiniz</option>
                        {devices.find(device => device.serialNumber === values.trigger.serialNumber)?.parameters.map((parameter) => (
                          <option key={parameter.key} value={parameter.key}>
                            {parameter.key}
                          </option>
                        ))}
                      </Field>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-4">
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="trigger.operator"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Operator
                        </label>
                        <Field
                        as="select"
                        name="trigger.operator"
                        id="trigger.operator"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="<=">&lt;=</option>
                        <option value="==">==</option>
                        <option value="!=">!=</option>
                      </Field>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="trigger.value"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Değer
                        </label>
                        <Field
                          type="number"
                          name="trigger.value"
                          className="border-solid border-2 border-gray disabled:bg-gray  rounded-md p-2 mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-4">
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="actions[0].serialNumber"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Operator
                        </label>
                        <Field
                        as="select"
                        name="actions[0].serialNumber"
                        id="actions[0].serialNumber"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="">Seçiniz</option>
                        {devices.map((device) => (
                          <option key={device.serialNumber} value={device.serialNumber}>
                            {device.serialNumber}
                          </option>
                        ))}
                      </Field>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="actions[0].command"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Değer
                        </label>
                        <Field
                          type="text"
                          value="C_WRITE"
                          name="actions[0].command"
                          className="border-solid border-2 border-gray disabled:bg-gray  rounded-md p-2 mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-4">
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="actions[0].parameters.key"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Aksiyon Anahtarı
                        </label>
                        <Field
                        as="select"
                        name="actions[0].parameters.key"
                        id="actions[0].parameters.key"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="" disabled>Seçiniz</option>
                        {devices.find(device => device.serialNumber === values.actions[0].serialNumber)?.parameters.map((parameter) => (
                          <option key={parameter.key} value={parameter.key}>
                            {parameter.key}
                          </option>
                        ))}
                      </Field>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <label
                          htmlFor="actions[0].parameters.value"
                          className="font-poppins font-semibold text-primary pt-2"
                        >
                          Değer
                        </label>
                        <Field
                          type="number"
                          name="actions[0].parameters.value"
                          className="border-solid border-2 border-gray disabled:bg-gray  rounded-md p-2 mt-1"
                        />
                      </div>
                    </div>
                    
                    <button
                      className="bg-primary text-white px-4 py-2 mr-4 rounded"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Oluştur
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {hasScenarioModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleBackdropClick}
              >
                <div
                  className="bg-white p-6 pt-0 rounded-lg shadow-lg flex flex-col justify-between items-center  w-[450px] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-xl font-bold pt-2">{hasScenarioModalText}</h2>
                  <div className="flex flex-row justify-between items-center pt-2">
                  <button type="button" className="bg-success text-white px-4 py-2 mr-4 rounded" onClick={() => {setHasScenarioModal(false); }}>Yeni bir senaryo ekle</button>
                    <button type="button" className="bg-danger text-white px-4 py-2 mr-4 rounded" onClick={() => {setHasScenarioModal(false); setIsModalOpen(false) }}>İptal</button>
                  </div>
                </div>
              </div>
            )}
    </section>
  );
};

export default Scenario;
