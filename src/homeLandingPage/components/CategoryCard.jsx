import styles from "../../style"
import PropTypes from 'prop-types';
import ProductCard from "./ProductCard"
import LineChartCard from "./LineChartCard";
import AreaChartCard from "./AreaChartCard";
import BarChartCard from "./BarChartCard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDevices } from "../../state";

const CategoryCard = (props) => {
  const [socket,setSocket] = useState(null);
  const token = useSelector((state) => state.token);
  const currentDevices = useSelector((state) => state.devices);
  const dispatch = useDispatch();

  const connectSocket = () => {
    if (!token) {
      console.error("Token yok!");
      return;
    }

    const newSocket = io("http://85.95.244.99:9268", {
      auth: { token: token }
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
    if(socket){
      socket.on("connect", () => {
        console.log("Connected to socket server");
        sendToken();
      });
      socket.on("connect_error",() => {
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
            const matchedData = data.find(item => item.key === parameter.key);
            if (matchedData) {
              return {
                ...parameter,
                status: matchedData.value
              };
            }
            return parameter;
          })
        };
        const updatedDevicesList = currentDevices.map((device) =>
          device.serialNumber === updatedDevices.serialNumber ? updatedDevices : device
        );
        dispatch(setDevices(updatedDevicesList));
      }
      );
      
    }
  }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = "HipoIOT - Ana Sayfa";
  })

  return (
    <div className="flex flex-col items-center w-full min-h-[300px] max-w-[450px] col-span-1">
      <div className="flex w-full items-center justify-between px-4">
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            {props.name}
        </p>
        <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            <i className="fa-solid fa-temperature-high text-red-800 font-light"></i>
        </p>
      </div>
      <div className={`w-full grid ${props.width} gap-2`}>

        {props.parameters.map((parameter) => (
          <ProductCard key={parameter.name} icon={parameter.icon} name={parameter.label} status={parameter.status} isIncludePercantage={parameter.isIncludePercantage} rowSpan={parameter.rowSpan} colSpan={parameter.colSpan} color={parameter.color}/>
        ))}

        {/* <ProductCard icon="fa-solid fa-faucet" name="Su" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-yellow-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Koltuk Işık" status="Açık" isIncludePercantage={false} rowSpan="row-span-8" colSpan="col-span-2" color="bg-green-600"/>
        <ProductCard icon="fa-solid fa-fire-flame-simple" name="Şömine" status="Açık" isIncludePercantage={false} rowSpan="row-span-2" colSpan="col-span-2" color="bg-red-600" />
        <ProductCard icon="fa-regular fa-lightbulb" name="Oda Lambasi" status="100" isIncludePercantage={true} rowSpan="row-span-4" colSpan="col-span-2" color="bg-blue-300" /> */}


        {/* <LineChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d"  chartType="single"/>
        <AreaChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/>
        <BarChartCard colSpan="col-span-4" rowSpan="row-span-4" color="#8884d8" color2="#82ca9d" chartType="single"/> */}
      </div>
    </div>
  )
}

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
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CategoryCard
