import React from "react";
import dateFormat from "dateformat";
import useMyContext from "../hooks/useContext";
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import EditeListForm from "../features/EditeListForm";

function Card({ data, all, editFunc, index, setState, state }) {
  const { categoryId, amount, note, transactionType, category, createdAt } =
    data;

  const [open, setOpen] = useState(false);

  //   const date = "a";
  // const date = createdAt
  //   .split("T")[1]
  //   .split(".")[0]
  //   .split(":")
  //   .slice(0, 2)
  //   .join(":");
  //   console.log(data);
  const date =
    (all ? createdAt.split("T")[0] + " " : "") +
    createdAt.split("T")[1].split(".")[0].split(":").slice(0, 2).join(":");

  //   console.log(a);
  //   const date = dateFormat(createdAt, "h:MM");
  //   console.log(createdAt);

  return (
    <>
      {open ? (
        <Modal onClose={() => setOpen(false)} title={"Edit"} width={25}>
          <EditeListForm
            index={index}
            data={data}
            // editFunc={editFunc}
            state={state}
            setState={setState}
            onClose={() => setOpen(false)}
          />
        </Modal>
      ) : (
        ""
      )}
      <div
        onClick={() => {
          setOpen(true);
        }}
        role="button"
        className="bg-white rounded-lg p-4 hover:scale-110 transition dulation-500 hover:shadow-[0_0_16px_#D9D9D9]"
      >
        <div className="flex justify-between">
          <div>
            <div className="text-xl">{category.categoryName}</div>
            <div>note : {note}</div>
            {data.updatedAt ? <p className="text-gray-400">Edited</p> : null}
          </div>
          <div>
            <div
              className={`text-4xl text-end ${
                transactionType == "INCOME" ? "text-[#2e8d4e]" : "text-red-400"
              }`}
            >
              {transactionType == "INCOME" ? "+" : "-"}
              {amount.toLocaleString("en-US", {
                style: "currency",
                currency: "THB",
              })}
            </div>
            <div className="text-end">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
