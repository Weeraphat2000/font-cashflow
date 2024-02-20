import React from "react";
import { toast } from "react-toastify";
import image from "../images/cashflow.jpg";
import LoginForm from "../features/LoginForm";
import background from "../images/background.jpeg";
function LoginPage() {
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
      <LoginForm />
    </div>
  );
}

export default LoginPage;
