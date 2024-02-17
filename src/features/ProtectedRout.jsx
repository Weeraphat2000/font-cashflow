import { Navigate } from "react-router-dom";
import useMyContext from "../hooks/useContext";

function ProtectedRout({ children }) {
  const { user } = useMyContext();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRout;
