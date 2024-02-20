import React from "react";
import { useState } from "react";
import validateRegister from "./validations/validate-register";
import { registerApi } from "../apis/auth";
import { toast } from "react-toastify";
import useMyContext from "../hooks/useContext";

function RegisterForm({ onClose }) {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    inUse: "",
  });

  const { creatRegister } = useMyContext();

  const handleCnageRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    try {
      setError({ ...error, inUse: "" });
      e.preventDefault();
      const registerError = validateRegister(register);

      if (registerError) {
        setError({ ...error, ...registerError });
        return;
      }

      const user = await registerApi(register);

      if (user.data.message == "Email or mobile already in use") {
        setError({ ...error, inUse: "Email or mobile already in use" });
        toast.error("register false");
        return;
      }
      toast.success("register success");

      creatRegister(user);
      onClose();
    } catch (er) {
      console.log(er);
      toast.error(er.response.data.message);
    }
  };
  return (
    <div className="px-10 py-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label htmlFor="firstName">First name</label>
            <input
              className="border-none"
              style={{ borderBottom: "1px solid black" }}
              placeholder="John"
              type="text"
              id="firstName"
              name="firstName"
              value={register.firstName}
              onChange={handleCnageRegister}
            />
            {error.firstName ? (
              <label className="text-red-500">{error.firstName}</label>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last name</label>
            <input
              className="border-none"
              style={{ borderBottom: "1px solid black" }}
              placeholder="Doe"
              type="text"
              id="lastName"
              name="lastName"
              value={register.lastName}
              onChange={handleCnageRegister}
            />
            {error.lastName ? (
              <label className="text-red-500">{error.lastName}</label>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email address</label>
          <input
            className="border-none"
            style={{ borderBottom: "1px solid black" }}
            placeholder="example@gmail.com"
            type="text"
            id="email"
            name="email"
            value={register.email}
            onChange={handleCnageRegister}
          />
          {error.email ? (
            <label className="text-red-500">{error.email}</label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="border-none"
            style={{ borderBottom: "1px solid black" }}
            placeholder="mobile"
            type="text"
            id="mobile"
            name="mobile"
            value={register.mobile}
            onChange={handleCnageRegister}
          />
          {error.mobile ? (
            <label className="text-red-500">{error.mobile}</label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border-none"
            style={{ borderBottom: "1px solid black" }}
            placeholder="At least 6 characters and 1 English character"
            type="password"
            id="password"
            name="password"
            value={register.password}
            onChange={handleCnageRegister}
          />
          {error.password ? (
            <label className="text-red-500">{error.password}</label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            className="border-none"
            style={{ borderBottom: "1px solid black" }}
            placeholder="password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleCnageRegister}
          />
          {error.confirmPassword ? (
            <label className="text-red-500">{error.confirmPassword}</label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender">Gender</label>
          <div className="flex gap-4">
            <div className="flex gap-1">
              <input
                type="radio"
                name="gender"
                value="MALE"
                id="male"
                onChange={handleCnageRegister}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                id="female"
                onChange={handleCnageRegister}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {error.gender ? (
            <label className="text-red-500">{error.gender}</label>
          ) : null}
        </div>
        {error.inUse ? (
          <label className="text-red-500">{error.inUse}</label>
        ) : null}
        <div className="flex justify-between">
          <button className="hover:underline" type="button" onClick={onClose}>
            back
          </button>
          <button className="px-4 py-1 rounded bg-green-500 hover:bg-green-600 hover:text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
