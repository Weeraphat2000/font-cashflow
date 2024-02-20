import React from "react";
import { toast } from "react-toastify";
import image from "../images/cashflow.jpg";
import LoginForm from "../features/LoginForm";
import background from "../images/background.jpeg";
import FacebookLogin from "react-facebook-login";

import axios from "../configs/axios";
import { useContext } from "react";
import useMyContext from "../hooks/useContext";

function LoginPage() {
  const { setUser } = useMyContext();
  const click = () => {
    console.log("click");
  };
  const back = async (res) => {
    // console.log(res);
    const user = await axios.post("/loginWithFace", { id: res.id });
    console.log(user);
    setUser(user.data.message);
    localStorage.setItem("token", user.data.token);
  };
  return (
    <div
      className="h-[100vh] flex justify-center items-center gap-44 bg-gradient-to-b from-cyan-500 to-blue-500"
      //   style={{
      //     backgroundImage: `url(${background})`,
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      //   }}
    >
      <img src={image} alt="" width={500} className="rounded-lg" />
      <LoginForm>
        <FacebookLogin
          appId="411084504827647"
          autoLoad={true}
          fields="email"
          onClick={click}
          callback={back}
        />
      </LoginForm>
    </div>
  );
}

export default LoginPage;
