import "./App.css";
import Cookies from "js-cookie";
import HomePage from "../components/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import UsersList from "../components/UsersList";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";
import Header from "../components/Header";
import GridContent from "../components/GridContent";

function App() {
  const token = Cookies.get("token");
  const userInfo = getUserInfoFromCookiesToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="*" element={<GridContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
