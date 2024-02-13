import React from "react";
import useMyContext from "../hooks/useContext";
import { useState } from "react";
import Modal from "../components/Modal";
import AddListForm from "../features/AddListForm";

function HomePage() {
  const date = new Date();
  const [onAdd, setOnAdd] = useState(false);
  const result = date.toLocaleDateString("en-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-center">
      <div className="w-[70vw] bg-rose-300 flex justify-between">
        <div>{result}</div>
        {/* <div>{sum}</div> */}
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
