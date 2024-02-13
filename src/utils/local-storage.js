import axios from "../configs/axios";
export const getToken = () => localStorage.getItem("token");

export const checkTokenIsPass = async () => {
  const token = localStorage.getItem("token");
  const user = await axios("/");
};
