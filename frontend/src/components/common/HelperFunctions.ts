import { redirect, useNavigate, useNavigation } from "react-router-dom";
import jwt_decode  from "jwt-decode";
export const getJWTData = () => {
    const token = localStorage.getItem("token");
    if(token) {
        const decoded: JWTDecoded=  jwt_decode(token);
        if(decoded) localStorage.setItem("logginUserFullName", decoded.unique_name);
    }

   
    return true;
}

type JWTDecoded = {
    sub: string,
  email: string,
  unique_name: string,
}