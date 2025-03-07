import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import HomeLandingPage from './homeLandingPage';
import LoginPage from "./LoginPage";


function App() {


  return (
        <Routes>
          <Route path="/" element={<HomeLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}