import "./App.css";
import Cookies from "js-cookie";
import HomePage from "../components/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import UsersList from "../components/UsersList";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";

function App() {
  const token = Cookies.get("token");
  const userInfo = getUserInfoFromCookiesToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage isLogged={token} />} path="/"></Route>
        <Route element={<HomePage isLogged={token} />} path="/home"></Route>
        {token ? (
          <Route element={<UsersList />} path="/users"></Route>
        ) : (
          <>
            <Route element={<LoginComponent />} path="/login"></Route>
            <Route element={<RegisterComponent />} path="/register"></Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
