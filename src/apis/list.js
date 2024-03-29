import axios from "../configs/axios";
export const addList = (data) => axios.post("/list", data);

export const listCurrentDate = () => axios.get("/list/current");

export const fetchAllList = (offset, limit) =>
  axios.get(`/list/${offset}/${limit}`);
