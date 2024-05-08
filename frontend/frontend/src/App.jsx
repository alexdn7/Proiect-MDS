import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";
import GridContent from "../components/GridContent";
import HomePage from "../components/HomePage";

function App() {
  const token = Cookies.get("token");
  let userDetails = null;

  if (token) {
    userDetails = getUserInfoFromCookiesToken(token);
    console.log(userDetails);
  }

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <Route path="*" element={<GridContent userDetails={userDetails} />} />
        ) : (
          <>
            <Route path="/home" element={<HomePage isLogged="false" />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
