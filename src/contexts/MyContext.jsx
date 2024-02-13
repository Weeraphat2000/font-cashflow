import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { fetchMe } from "../apis/auth";
import axios from "../configs/axios";

const MyContext = createContext();
export { MyContext };
function MyContextProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [user, setUser] = useState("");

  const creatRegister = (user) => {
    setUser(user.data.newUser);

    localStorage.setItem("token", user.data.token);
  };

  const login = async (dataUser, token) => {
    setUser(dataUser);
    localStorage.setItem("token", token);
  };

  const allCategory = async () => {
    const list = await axios.get("/category");
    console.log(list.data.list);
    setCategoryList(list.data.list);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchMe()
        .then((res) => setUser(res.data.user))
        .catch((er) => {
          toast.error(er.response?.data.message);
        });
      allCategory();
    }
  }, []);
  console.log(user);
  return (
    <MyContext.Provider
      value={{
        creatRegister,
        setUser,
        user,
        login,
        setAllList,
        allList,
        categoryList,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
