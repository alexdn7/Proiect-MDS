import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const saveInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const userInfo = {
      userId: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
    Cookies.set("userInfo", JSON.stringify(userInfo), { expires: 1 });
  } catch (error) {
    console.error(error);
  }
};
