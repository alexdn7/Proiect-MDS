import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const getUserInfoFromCookiesToken = () => {
  try {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userInfo = {
      userId: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
    return userInfo;
  } catch (error) {
    console.error(error);
  }
};