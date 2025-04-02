import { useState } from "react";
import { navLinks } from "../constants";
import logoWhite from "../../assets/logoWhite.png";
import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { color } from "three/tsl";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [toggle, setToggle] = useState(false);
  const [sectionType, setSectionType] = useState("Device Register");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [keys, setKeys] = useState([]);
  const [jsonData, setJsonData] = useState("");


  const getKeys = async () => {
    console.log(jsonData)
    const response = await fetch("http://85.95.244.99:8999/api/v1/json/save",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: jsonData
    });
    const data = await response.json();
    setKeys(data);
    setSectionType("Parameter Register");
    console.log(data);
  }

  const validationSchema = Yup.object({
    serialNumber: Yup.string().required("Serial Number is required"),
    deviceName: Yup.string().required("Device Name is required"),
    width: Yup.string().required("Width is required"),
    parameters: Yup.array()
      .of(
        Yup.object().shape({
          key: Yup.string().required("Key is required"),
          icon: Yup.string().required("Icon Value is required"),
          label: Yup.string().required("Label is required"),
          type: Yup.string().required("Type is required"),
          isIncludePercantage: Yup.boolean().required(
            "Is Include Percentage is required"
          ),
          rowSpan: Yup.string().required("Row Span is required"),
          colSpan: Yup.string().required("Col Span is required"),
          color: Yup.string().required("Color is required"),
          status: Yup.string().default("0"),
        })
      )
      .required("Parameters are required"),
  });

  const handleSubmit = async (values) => {
    console.log("submitted");
    console.log(JSON.stringify(values));
    const deviceResponce = await fetch(
      "http://85.95.244.99:8999/api/v1/templates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(values),
      }
    );
    // const device = await deviceResponce.json();
    // console.log(device);
    navigate("/");
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center navbar">
        <img src={logoWhite} alt="Brain Logo" className="h-[60px]" />

        <ul className="list-none sm:flex hidden justify-start pl-10 items-center flex-1">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[18px] text-gray mr-10`}
            >
              <Link to={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
          {location.pathname === "/editLayout" && (
            <li
              className={`font-poppins font-normal cursor-pointer text-[18px] text-gray ml-auto`}
            >
              <Link to="/">
                <i className="fa-solid fa-check"></i>
              </Link>
            </li>
          )}
          {location.pathname === "/" && (
            <>
              <li
                className={`font-poppins font-normal cursor-pointer text-[18px] text-gray ml-auto`}
              >
                <i
                  className="fa-solid fa-plus"
                  onClick={() => setIsModalOpen(true)}
                ></i>{" "}
                {/* Open modal */}
              </li>
              <li
                className={`font-poppins font-normal cursor-pointer text-[18px] text-gray ml-auto`}
              >
                <Link to="/editLayout">
                  <i className="fa-solid fa-pencil"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          {toggle ? (
            <XCircleIcon
              className="w-[50px] text-gray object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />
          ) : (
            <Bars3Icon
              className="w-[50px] text-gray object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />
          )}

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-white-gradient shadow-glow-inset absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] text-gray mb-0`}
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] flex flex-col items-center justify-center max-h-[800px] overflow-hidden">
          <h2 className="text-xl font-bold mb-4 self-start sticky top-0 bg-white z-10 p-4">
            Yeni Cihaz Ekle
          </h2>
            <div className="overflow-y-auto w-full">

           
            <Formik
              initialValues={{
                serialNumber: "",
                deviceName: "",
                width: "grid-cols-4",
                
                parameters: [
                  {
                    key: "",
                    icon: "",
                    label: "",
                    type: "float",
                    isIncludePercantage: false,
                    rowSpan: "row-span-2",
                    colSpan: "col-span-2",
                    color: "bg-yellow-600",
                    status: "0",
                  },
                ],
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting,values,setFieldValue }) => (
                <Form action="" className="flex flex-col w-full mt-2">
                  <div className="flex flex-col gap-4 w-full">
                    <label
                      htmlFor="serialNumber"
                      className="font-poppins font-semibold text-primary pt-2"
                    >
                      Seri Numarası
                    </label>
                    <Field
                      type="text"
                      name="serialNumber"
                      id="serialNumber"
                      disabled={sectionType === "Parameter Register"}
                      className="border-solid border-2 border-gray disabled:bg-gray  rounded-md p-2 mt-1"
                    />
                    <ErrorMessage
                      name="serialNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    {sectionType === "Device Register" && (
                      <>
                        <label
                        htmlFor="JSON"
                        className="font-poppins font-semibold text-primary pt-2"
                      >
                        JSON Veri
                      </label>
                      <textarea
                        rows={8}
                        name="JSON"
                        id="JSON"
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1"
                      />
                      </>
                    )}
                    {sectionType === "Parameter Register" && (
                      <>
                        <label
                        htmlFor="deviceName"
                        className="font-poppins font-semibold text-primary pt-2"
                      >
                        Cihaz Adı
                      </label>
                      <Field
                        type="text"
                        name="deviceName"
                        id="deviceName"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1"
                      />
                      <ErrorMessage
                        name="deviceName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <label
                        htmlFor="width"
                        className="font-poppins font-semibold text-primary pt-2"
                      >
                        Genişlik
                      </label>
                      <Field
                        as="select"
                        name="width"
                        id="width"
                        className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                      >
                        <option value="">Seçiniz</option>
                        <option value="grid-cols-4">4</option>
                        <option value="grid-cols-6">6</option>
                      </Field>
                      <ErrorMessage
                        name="width"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <label
                        htmlFor="parameters"
                        className="font-poppins font-semibold text-primary pt-2"
                      >
                        Parametreler
                      </label>
                      {values.parameters.map((parameter, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 border-solid border-2 border-gray rounded-md p-2 mt-1"
                        >
                          <div className="col-span-1 flex items-center gap-5">
                            <label 
                              htmlFor={`parameters[${index}].key`}
                              className=" font-poppins font-semibold text-primary pt-2"
                            >
                              Anahtar
                            </label>
                            <Field
                              as="select"
                              name={`parameters[${index}].key`}
                              id={`parameters[${index}].key`}
                              className=" border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                            >
                              {keys.map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </Field>
                          </div>
                            
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].icon`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              İkon
                            </label>
                            <Field
                                as="select"
                                name={`parameters[${index}].icon`}
                                id={`parameters[${index}].icon`}
                                className="border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                              >
                              <option value="fa-solid fa-faucet">
                                Musluk
                              </option>
                              <option value="fa-solid fa-droplet">
                                Nem
                              </option>
                              <option value="fa-solid fa-plug">
                                Güç
                              </option>
                              <option value="fa-solid fa-lightbulb">
                                Aydınlatma
                              </option>
                              <option value="fa-solid fa-wind">
                                Hava Akışı
                              </option>
                              <option value="fa-solid fa-gauge">
                                Basınç
                              </option>
                              <option value="fa-solid fa-signal">
                                Sinyal
                              </option>
                              <option value="fa-solid fa-bolt">
                                Voltaj
                              </option>
                            </Field>
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].label`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              İsim
                            </label>
                            <Field
                              type="text"
                              name={`parameters[${index}].label`}
                              id={`parameters[${index}].label`}
                              className="border-solid border-2 border-gray rounded-md p-2 mt-1"
                            />
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].type`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              Tür
                            </label>
                            <Field
                              type="text"
                              name={`parameters[${index}].type`}
                              id={`parameters[${index}].type`}
                              className="border-solid border-2 border-gray rounded-md p-2 mt-1"
                            />
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label 
                              htmlFor={`parameters[${index}].isIncludePercantage`}
                              className=" font-poppins font-semibold text-primary pt-2"
                            >
                              Yüzde içeriyor mu
                            </label>
                            <Field
                              as="select"
                              name={`parameters[${index}].isIncludePercantage`}
                              id={`parameters[${index}].isIncludePercantage`}
                              className=" border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                            >
                                <option value={true}>Evet</option>
                                <option value={false}>Hayır</option>
                            </Field>
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].color`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              Renk
                            </label>
                            <Field
                              type="text"
                              name={`parameters[${index}].color`}
                              id={`parameters[${index}].color`}
                              className="border-solid border-2 border-gray rounded-md p-2 mt-1"
                            />
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].rowSpan`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              Satır
                            </label>
                            <Field
                              as="select"
                              name={`parameters[${index}].rowSpan`}
                              id={`parameters[${index}].rowSpan`}
                              className=" border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                            >
                              <option value="row-span-2">2</option>
                              <option value="row-span-1">1</option>
                            </Field>
                          </div>
                          <div className="col-span-1 flex items-center gap-5">
                            <label
                              htmlFor={`parameters[${index}].colSpan`}
                              className="font-poppins font-semibold text-primary pt-2"
                            >
                              Sütun
                            </label>
                            <Field
                              as="select"
                              name={`parameters[${index}].colSpan`}
                              id={`parameters[${index}].colSpan`}
                              className=" border-solid border-2 border-gray rounded-md p-2 mt-1 bg-white cursor-pointer"
                            >
                              <option value="col-span-2">2</option>
                              <option value="col-span-1">1</option>
                            </Field>
                          </div>
                          
                          
                          

                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-secondary text-white px-4 py-2 mt-2 rounded"
                        onClick={() => {
                          setFieldValue("parameters", [
                            ...values.parameters,
                            {
                              key: "",
                              icon: "",
                              label: "",
                              type: "",
                              isIncludePercantage: false,
                              rowSpan: "row-span-2",
                              colSpan: "col-span-2",
                              color: "bg-yellow-600",
                              status: "0",
                            },
                          ]);
                        }}
                      >
                        Parametre Ekle
                      </button>
                      </>)}

                    
                   

                    
                  </div>
                  <div className="self-end pt-4">
                    {sectionType === "Parameter Register" && (
                      <button
                      className="bg-primary text-white px-4 py-2 mr-4 rounded"
                      type="submit"
                      disabled={isSubmitting}
                      >Oluştur
                      </button>
                    )}
                   

                    {sectionType === "Device Register" && (
                      <button type="button"
                      className="bg-secondary text-white px-4 py-2 mr-4 rounded"
                      onClick={() => getKeys()} 
                    >
                      İleri
                    </button>
                    )}
                   
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => setIsModalOpen(false)} // Close modal
                    >
                      İptal
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
