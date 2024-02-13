import { Navigate } from "react-router-dom";
import useMyContext from "../hooks/useContext";

export default function RedirecIfAuth({ children }) {
  const { user } = useMyContext();
  return user ? <Navigate to="/" /> : children;
}
