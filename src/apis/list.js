import axios from "../configs/axios";
export const addList = (data) => axios.post("/list", data);
