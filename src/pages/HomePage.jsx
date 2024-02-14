import React from "react";
import useMyContext from "../hooks/useContext";
import { useState } from "react";
import Modal from "../components/Modal";
import AddListForm from "../features/AddListForm";
import { useEffect } from "react";
import axios from "../configs/axios";

function HomePage() {
  const [onAdd, setOnAdd] = useState(false);

  const fetchListCurrentDate = async () => {
    try {
      const data = await axios.get("/list/current");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchListCurrentDate();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[70vw] bg-rose-300 flex justify-between">
        <div></div>
        <button
          onClick={() => {
            setOnAdd((r) => !r);
          }}
        >
          add
        </button>
        {onAdd && (
          <Modal width={25} title={"Create"} onClose={() => setOnAdd(false)}>
            <AddListForm onClose={() => setOnAdd(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default HomePage;
