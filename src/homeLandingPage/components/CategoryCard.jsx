import styles from "../../style";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDevices } from "../../state";

const CategoryCard = (props) => {
  const [socket, setSocket] = useState(null);
  const token = useSelector((state) => state.token);
  const currentDevices = useSelector((state) => state.devices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sureModal, setSureModal] = useState(false);
  const [sureModalText, setSureModalText] = useState("");
  const [currentRelayCommand, setCurrentRelayCommand] = useState({});

  const openSureModalForRelay = (key, status, label) => {
    setSureModal(true);
    setSureModalText(`${label} isimli cihaz ${status === null || status === "0" ? "açılacaktır." : "kapatılacaktır."}`);
    setCurrentRelayCommand({key:key,status:status})
  }

  const sendRelayCommand = async (command, key, value) => {
    console.log(command,key,value)
    const response = await fetch(
      "http://85.95.244.99:8999/api/v1/templates/send-relay-command",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serialNumber: props.all.serialNumber,
          relayKey: key,
          commandKey: command,
          value: value,
        }),
      }
    );
    await props.getDevicesList();
    setSureModal(false);
  };

  const handleBackdropClick = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const connectSocket = () => {
    if (!token) {
      console.error("Token yok!");
      return;
    }

    const newSocket = io("http://85.95.244.99:9268", {
      auth: { token: token },
    });

    setSocket(newSocket);
  };

  const sendToken = () => {
    if (socket && socket.connected) {
      console.log("📡 Token gönderiliyor:", token);
      socket.emit("get_data", token);
    } else {
      console.log("❌ Socket bağlantısı yok");
    }
  };
  useEffect(() => {
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []); // Sadece component mount olduğunda çalışır

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket server");
        sendToken();
      });
      socket.on("connect_error", () => {
        console.log("Bağlantı hatası");
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
      socket.on("matched_data", (data) => {
        /*[
              {
                "topic": "Ni7fsYK2gReP",
                "key": "sensor-1",
                "value": 38
            },
            {
                "topic": "Ni7fsYK2gReP",
                "key": "sensor-2",
                "value": 11
            }
          ]*/
        const updatedDevices = {
          ...props.all, // tüm üst düzey özellikleri kopyala (serialNumber, deviceId, vb.)
          parameters: props.parameters.map((parameter) => {
            const matchedData = data.find((item) => item.key === parameter.key);
            if (matchedData) {
              return {
                ...parameter,
                status: matchedData.value,
              };
            }
            return parameter;
          }),
        };
        const updatedDevicesList = currentDevices.map((device) =>
          device.serialNumber === updatedDevices.serialNumber
            ? updatedDevices
            : device
        );
        dispatch(setDevices(updatedDevicesList));
      });
    }
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = "HipoIOT - Ana Sayfa";
  });

  return (
    <div className="flex flex-col items-center w-full min-h-[300px] max-w-[450px] col-span-1">
      <div className="flex w-full items-center justify-between px-4">
        <p
          className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}
        >
          {props.name}
        </p>
        <p
          className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}
        >
          <i
            className="fa-solid fa-house-signal text-primary font-light text-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          ></i>
        </p>
      </div>
      <div className={`w-full grid ${props.width} gap-2`}>
        {props.parameters.map((parameter) => (
          <ProductCard
            key={parameter.key}
            deviceKey={parameter.key}
            serialNumber={props.all.serialNumber}
            icon={parameter.icon}
            name={parameter.label}
            status={parameter.status}
            isIncludePercantage={parameter.isIncludePercantage}
            rowSpan={parameter.rowSpan}
            colSpan={parameter.colSpan}
            color={parameter.color}
            visualization={parameter.visualization}
          />
        ))}

        {/* <ProductCard icon="fa-solid fa-faucet" name="Su" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-yellow-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Koltuk Işık" status="Açık" isIncludePercantage={false} rowSpan="row-span-8" colSpan="col-span-2" color="bg-green-600"/>
        <ProductCard icon="fa-solid fa-fire-flame-simple" name="Şömine" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-red-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Oda Lambasi" status="100" isIncludePercantage={true} rowSpan="row-span-4" colSpan="col-span-2" color="bg-blue-300" /> */}

        {/* <LineChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d"  chartType="single"/>
        <AreaChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/>
        <BarChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/> */}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white p-6 pt-0 rounded-lg shadow-lg flex flex-col justify-between  w-[900px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold pt-2">{props.name}</h2>
            <div className="flex items-center justify-between pt-5">
              {props.parameters
                .filter((parameter) => parameter.isItRelay === true)
                .map((parameter) => (
                  <label
                    key={parameter.key}
                    className="inline-flex items-center me-5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer border-2 border-red-50"
                      checked={parameter.status === null || parameter.status === "0" ? false : true}
                      /*onClick={() =>
                        sendRelayCommand(
                          "C_WRITE",
                          parameter.key,
                          parameter.status === null ? "1" : "0"
                        )
                      }*/
                     onClick={() => openSureModalForRelay(parameter.key, parameter.status,parameter.label)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer ring-4 ring-green-600 checked:ring-0 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 "></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 ">
                      Green
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      )}

      {sureModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white p-6 pt-0 rounded-lg shadow-lg flex flex-col justify-between items-center  w-[450px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold pt-2">{sureModalText}</h2>
            <h2 className="text-xl font-bold">Onaylıyor musunuz?</h2>
            <div className="flex flex-row justify-between items-center pt-2">
              <button type="button" className="bg-secondary text-white px-4 py-2 mr-4 rounded" onClick={() => sendRelayCommand( "C_WRITE",currentRelayCommand.key,currentRelayCommand.status === null || currentRelayCommand.status === "0" ? "1" : "0" )}>Evet</button>
              <button type="button" className="bg-danger text-white px-4 py-2 mr-4 rounded" onClick={() => setSureModal(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      rowSpan: PropTypes.string.isRequired,
      colSpan: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isIncludePercantage: PropTypes.bool.isRequired,
      isItRelay: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryCard;
