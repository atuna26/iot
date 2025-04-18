import { useDispatch } from 'react-redux';
import styles from '../../style'
import CategoryCard from './CategoryCard'
import { useSelector } from 'react-redux';
import { setDevices } from '../../state';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const Main = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
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
      console.log(devices)
      document.title = "HipoIOT - Ana Sayfa";
    }
    , []);// eslint-disable-line react-hooks/exhaustive-deps

  return (


    <section className={`flex sm:flex-row flex-col  w-full justify-end items-center ${styles.paddingY}`}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {devices.map((device) => (
            <CategoryCard key={JSON.stringify(device)} name={device.deviceName} width={device.width} parameters={device.parameters} all={device} getDevicesList={getDevicesList} />
          ))}
      </div>
  </section>
  )
}

export default Main
