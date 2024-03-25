import "./App.css";
import Cookies from "js-cookie";
import HomePage from "../components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

function App() {
  const userInfo = Cookies.get("userInfo");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage isLogged={userInfo} />} path="/"></Route>
        <Route element={<HomePage isLogged={userInfo} />} path="/home"></Route>
        {userInfo ? null : (
          <>
            <Route element={<LoginComponent />} path="/login"></Route>
            <Route element={<RegisterComponent />} path="/register"></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
