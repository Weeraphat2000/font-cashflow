import React from "react";
import { useState } from "react";
import useMyContext from "../hooks/useContext";
import { toast } from "react-toastify";

function EditeListForm({ data, editFunc, onClose, index }) {
  const [date, setDate] = useState(data.createdAt.split("T")[0]);
  const [hr, setHr] = useState(
    data.createdAt.split("T")[1].split(":").slice(0, 2).join(":")
  );
  const { categoryList } = useMyContext();
  const [edit, setEdit] = useState(data);

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  const handlSubmit = (e) => {
    console.log({ ...edit, createdAt: date + "T" + hr + ":00.000Z" });
    e.preventDefault();
    toast.success("edited");
    onClose();
    edit(id, dataUpdate);
  };
  const checked1 = edit.transactionType == "EXPENSE" ? true : false;
  const checked2 = edit.transactionType == "INCOME" ? true : false;
  //   console.log("date", edit.createdAt.split("T")[0]);
  //   console.log(
  //     "hr",
  //     edit.createdAt.split("T")[1].split(":").slice(0, 2).join(":")
  //   );
  console.log(date);
  console.log(hr);
  console.log(index);
  return (
    <div className="py-4 px-14">
      <form onSubmit={handlSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <input
              onChange={handleChange}
              className="border-none py-1"
              style={{ borderBottom: "1px solid" }}
              placeholder="0฿"
              type="text"
              id="amount"
              name="amount"
              value={edit.amount}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note">Note</label>
            <input
              onChange={handleChange}
              className="border-none py-1"
              style={{ borderBottom: "1px solid" }}
              placeholder="Aa"
              type="text"
              id="note"
              name="note"
              value={edit.note}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Transaction</div>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="transactionType"
                  id="income"
                  value={"INCOME"}
                  checked={checked2}
                />
                <label htmlFor="income">Income</label>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="transactionType"
                  id="expense"
                  value="EXPENSE"
                  checked={checked1}
                />
                <label htmlFor="expense">Expense</label>
              </div>
            </div>
          </div>

          {edit.transactionType == "EXPENSE" ? (
            <>
              <div>
                <div>Category</div>
                <select
                  name="categoryId"
                  id=""
                  value={edit.categoryId}
                  onChange={handleChange}
                >
                  <option value="1" disabled>
                    select
                  </option>
                  {categoryList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}
          <div>
            <div className="flex gap-5">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <input
                type="time"
                max={"24:00"}
                min={"00:00"}
                value={hr}
                onChange={(e) => {
                  setHr(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="hover:scale-110 transition dulation-500 px-4 text-white py-2 bg-gray-400 rounded-lg hover:bg-green-500 hover:text-white">
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditeListForm;
