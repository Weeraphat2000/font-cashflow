import axios from "../configs/axios";

export const registerApi = (body) => axios.post("/register", body);

export const findMeApi = (username) => axios.post("/login", username);

export const fetchMe = () => axios.get("/me");
