import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import RegisterForm from "./RegisterForm";
import useMyContext from "../hooks/useContext";
import { findMeApi } from "../apis/auth";

function LoginForm() {
  const { login, setUser } = useMyContext();
  const [register, setRegister] = useState({ username: "", password: "" });
  const [openModal, setOpenModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await findMeApi(register);
    console.log(user);
    if (user.data.message == "username or password invalid") {
      toast.error("username or password invalid");
      return;
    }

    toast.success("register");
    setUser(user.data.user);
    localStorage.setItem("token", user.data.token);
  };
  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-10 border rounded-2xl w-[450px] p-10 bg-white">
      {openModal && (
        <Modal
          width={30}
          title={"Register"}
          onClose={() => setOpenModal(false)}
        >
          <RegisterForm onClose={() => setOpenModal(false)} />
        </Modal>
      )}
      <h1 className="text-center text-[50px]">Welcome back</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="border-none py-1"
            style={{ borderBottom: "2px solid black" }}
            type="text"
            id="username"
            name="username"
            placeholder="Email or mobile"
            onChange={handleChange}
            value={register.username}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Password</label>
          <input
            className="border-none py-1"
            style={{ borderBottom: "2px solid black" }}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={register.password}
          />
        </div>
        <button className="w-full py-2 bg-green-500 text-xl hover:bg-green-600 rounded">
          Login
        </button>
        <hr className="mt-2" />
        <button
          type="button"
          className="hover:underline"
          onClick={() => setOpenModal(true)}
        >
          create new account ?
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
