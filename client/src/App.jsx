import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "./homeLandingPage/components/Main";
import LoginPage from "./LoginPage";
import AdminPanel from "./AdminPanel";
import styles from "./style";
import { Navbar } from "./homeLandingPage/components";
import RegisterPage from "./RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import AllProducts from "./allProducts";
import { useEffect, useState } from "react";
import AdminNavbar from "./adminPanel/adminNavbar";
import EventList from "./adminPanel/eventList";
import ProductList from "./adminPanel/ProductList";
import NewProduct from "./adminPanel/newProduct";
import NewNew from "./adminPanel/NewNew";
import NewList from "./adminPanel/NewList";
import { setCompareProduct, setProduct } from "./state";
import Institutional from "./institutional";
import Mine from "./mine";
import Factories from "./factories";
import ReferenceList from "./adminPanel/References";
import NewReferences from "./adminPanel/NewReferences";
import References from "./references";
import OurPolicy from "./institutional/ourPolicy";
import MissionAndVision from "./institutional/mission";

function App() {
  const isAuth = useSelector((state) => state.token);
  const location = useLocation();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const compareProduct = useSelector((state) => state.compareProduct);
  const [itemBox, setItemBox] = useState(false);
  const [alertBox, setAlertBox] = useState(false);

  const getProduct = async (ids) => {
    const arrayIds = ids.join(",");
    const response = await fetch(
      `http://localhost:3003/product/product-list/compare/${arrayIds}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setCompareProduct(data));
  };

  useEffect(() => {
    if (items.length > 0) {
      getProduct(items);
    }
  }, [items]);

  const itemAdd = (item) => {
    if (!items.includes(item)) {
      if(items.length <5){
        setItems((prev) => [...prev, item]);
        itemBoxOn();
        setTimeout(() => {
          itemBoxOff();
        }, 3000);
      }else{
        setAlertBox(true);
        setTimeout(() => {
          setAlertBox(false);
        }, 3000);
      }
    }
  };

  const itemBoxOn = () => {
    setItemBox(true);
  };
  const itemBoxOff = () => {
    setItemBox(false);
  };

  const deleteItem = (item) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };
  return (
    <div>
      {!location.pathname.includes("admin-panel") && (
        <div className="w-full min-h-screen">
          <div
            className={`${styles.flexCenter} shadow-lg  border-b-[.5px] border-gray`}
          >
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <div className={` ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route
                  path="/mermerler/tum-mermerler"
                  element={<AllProducts setItems={itemAdd} />}
                />
                <Route path="/kurumsal/hakkimizda" element={<Institutional />} />
                <Route path="/kurumsal/kalite-politikamiz" element={<OurPolicy />} />
                <Route path="/kurumsal/misyon-vizyon" element={<MissionAndVision />} />
                <Route path="/ocaklar" element={<Mine />} />
                <Route path="/fabrikalar/bandirma-fabrika" element={<Factories />} />
                <Route path="/referanslar" element={<References />} />
              </Routes>
            </div>
            <div
              className="fixed right-0 bottom-0 mr-5 mb-5 flex flex-col items-end gap-2"
              onMouseEnter={itemBoxOn}
              onMouseLeave={itemBoxOff}
            >
              {alertBox && (
                <div className="bg-accent text-white w-[200px] rounded shadow-lg">
                  <p>Maksimum 5 adet eklenebilir.</p>
                </div>
              )}

              {itemBox && (
                <div className="flex flex-row justify-center items-center bg-primary text-white min-w-[500px] rounded shadow-lg">
                  {/* <h1 className="text-lg p-2">Karşılaştırma Listesi</h1>
                    <hr className="border-b border-secondary w-full" /> */}
                  {compareProduct.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col justify-between items-center w-full p-1 border-r border-gray-400"
                    >
                      <div className="relative w-full flex justify-center items-center">
                        <img
                          src={`http://localhost:3003/uploads/${item.imagePath[0]}`}
                          alt={item.name}
                          className="w-[100px] my-2 h-[100px] rounded"
                        />
                        <i
                          onClick={() => deleteItem(item)}
                          className="fa-solid fa-trash text-sm cursor-pointer text-white absolute top-0 right-0 m-2"
                        ></i>
                      </div>

                      <hr className="border-b opacity-25 border-gray-400 w-full" />
                      <p className="text-sm font-light my-2">{item.code}</p>
                      <hr className="border-b opacity-25 border-gray-400 w-full" />
                      <p className="text-sm font-light  my-2">{item.type}</p>
                      <hr className="border-b opacity-25 border-gray-400 w-full" />
                      <p className="text-md font-semibold  my-2">{item.name}</p>
                      <hr className="border-b opacity-25 border-gray-400 w-full" />
                      <p
                        onClick={() => deleteItem(item)}
                        className="text-sm cursor-pointer text-info  my-2"
                      >Detaylı incele</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center items-center w-[50px] h-[50px] text-white bg-primary rounded-full cursor-pointer relative">
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent border-2 border-white rounded-full -top-2 -end-2">
                  {items.length}
                </div>
                <i className="fa-solid fa-code-compare"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      {location.pathname.includes("/admin-panel") && (
        <div className="w-full">
          <div
            className={`${styles.paddingX} ${styles.flexCenter} shadow-lg  border-b-[.5px] border-gray`}
          >
            <div className={`${styles.boxWidth}`}>
              <AdminNavbar />
            </div>
          </div>
          <div className={` ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              {isAuth ? (
                <Routes>
                  <Route path="/admin-panel" element={<ProductList />} />
                  <Route
                    path="/admin-panel/etkinlikler"
                    element={<EventList />}
                  />
                  <Route
                    path="/admin-panel/etkinlikler/yeni"
                    element={<AdminPanel />}
                  />
                  <Route
                    path="/admin-panel/urunler"
                    element={<ProductList />}
                  />
                  <Route
                    path="/admin-panel/urunler/yeni"
                    element={<NewProduct />}
                  />
                  <Route path="/admin-panel/haberler" element={<NewList />} />
                  <Route
                    path="/admin-panel/haberler/yeni"
                    element={<NewNew />}
                  />
                  <Route path="/admin-panel/referanslar" element={<ReferenceList />} />
                  <Route
                    path="/admin-panel/referanslar/yeni"
                    element={<NewReferences />}
                  />
                </Routes>
              ) : (
                <Routes>
                  <Route
                    path="/admin-panel/*"
                    element={<Navigate to="/admin-panel/login" />}
                  />
                  <Route path="/admin-panel/login" element={<LoginPage />} />
                </Routes>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
