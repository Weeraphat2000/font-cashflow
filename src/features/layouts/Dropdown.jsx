import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import useMyContext from "../../hooks/useContext";
import { Link } from "react-router-dom";

function Dropdown() {
  const { setUser } = useMyContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      const handlClickOutSide = (e) => {
        // console.log(e.target); // จะได้สิ่งที่เรากด

        // console.log(ref.current.contains(e.target)); // เช็คว่าใน sibling ไหม
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };

      document.addEventListener("mouseup", handlClickOutSide);
      return () =>
        // ต้อง remove เพราะว่ามันจะ addEventListener เข้าไป
        document.removeEventListener("mouseup", handlClickOutSide);
    }
  }, [open]);

  return (
    <div>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((r) => !r)}
          className="w-8 h-8 rounded-full bg-green-500"
        />
        {open && (
          <div className="absolute right-0 bg-white border-2 rounded-xl">
            <Link to={"/login"}>
              <button
                onClick={() => {
                  setUser("");
                  localStorage.removeItem("token");
                }}
                className="px-6 py-2 text-black hover:bg-gray-400 hover:text-white rounded-xl"
              >
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
