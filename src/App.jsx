import { useState } from "react";
import useMyContext from "./hooks/useContext";
import Router from "./routes/route";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { a } = useMyContext();
  return (
    <>
      <Router />
      <ToastContainer
        // ตำแหน่ง toast
        position="bottom-right"
        // ให้มันปิดเอง 3s
        autoClose={3000}
        // เห็นหลอดเวลาลด
        hideProgressBar={false}
        // ทำให้ซ้อนๆกันได้
        // newestOnTop={false}
        theme="colored"
        // รูปแบบ
        transition={Slide}
      />
    </>
  );
}

export default App;
