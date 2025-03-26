import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate,  } from "react-router-dom";
import Main from "./homeLandingPage/components/Main";
import LoginPage from "./LoginPage";
import EditableMenu from "./homeLandingPage/components/EditableMenu";
import styles from "./style";
import { Navbar } from "./homeLandingPage/components";
import EditableMain from "./homeLandingPage/components/EditableMain";
import RegisterPage from "./RegisterPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token)); 
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div>
      {isAuth ? (
        <div className='bg-[#002f4f] w-full overflow-hidden'>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <div  className={` ${location.pathname === "/editLayout" ?  "bg-[#f3f3f3]" :  "bg-[#fafafa]" } ${styles.paddingX} ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Navigate to="/" replace/>} />
                <Route path="/register" element={<Navigate to="/" replace/>} />
                <Route path="/editLayout" element={<EditableMain />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
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