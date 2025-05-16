import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    // Token expiration check (assuming exp is in the payload)
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If decoding fails, consider it expired
  }
};

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return <Navigate to={"/"} replace={true} />;
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return children;
  }
  return <Navigate to={"/"} replace={true} />;
};

export const Admin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    return <Navigate to={"/"} replace={true} />;
  }

  try {
    const user = jwtDecode(token);
    if (user.isAdmin) {
      return children;
    }
  } catch (error) {
    // Handle invalid token
  }

  return <Navigate to={"/"} replace={true} />;
};
