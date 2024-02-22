import axios from "../configs/axios";
import React from "react";
import { useState } from "react";
import useMyContext from "../hooks/useContext";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { ImBin } from "react-icons/im";

function EditeListForm({ data, editFunc, onClose, index, state, setState }) {
  const [date, setDate] = useState(data.createdAt.split("T")[0]);
  const [hr, setHr] = useState(
    data.createdAt.split("T")[1].split(":").slice(0, 2).join(":")
  );
  const { categoryList } = useMyContext();
  const [edit, setEdit] = useState(data);
  const [open, setOpen] = useState(false);

  const [e, setE] = useState(false);
  const [t, setT] = useState(false);

  const handleChange = (e) => {
    if (e.target.name == "amount" && isNaN(+e.target.value)) {
      setE(true);
      return;
    }
    if (e.target.name == "amount") {
      setE(false);
    }
    if (e.target.name == "categoryId") {
      setT(false);
    }

    const list = {
      ...edit,
      [e.target.name]: e.target.value,
    };
    if (list.transactionType == "INCOME") {
      list.categoryId = 1;
    }

    setEdit(list);
    // setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  //
  // edit
  const editList = async (dataUpdate, state, setState, id, index) => {
    try {
      delete dataUpdate.category;
      delete dataUpdate.id;
      delete dataUpdate.userId;
      const newData = await axios.patch(`/list/${id}`, dataUpdate);
      const newState = [...state];
      newState.splice(index, 1);
      setState([newData.data.data, ...newState]);
    } catch (erro) {
      toast.error(erro.response.data.message);
    }
  };

  //
  // edit
  const handlSubmit = (e) => {
    // console.log({ ...edit, createdAt: date + "T" + hr + ":00.000Z" });
    e.preventDefault();

    if (edit.transactionType == "EXPENSE" && edit.categoryId == 1) {
      setT(true);
      return;
    }
    toast.success("edited");

    const dataUpdate = { ...edit, createdAt: date + "T" + hr + ":00.000Z" };
    editList(dataUpdate, state, setState, data.id, index);
    onClose();
  };

  const checked1 = edit.transactionType == "EXPENSE" ? true : false;
  const checked2 = edit.transactionType == "INCOME" ? true : false;
  //   console.log("date", edit.createdAt.split("T")[0]);
  //   console.log(
  //     "hr",
  //     edit.createdAt.split("T")[1].split(":").slice(0, 2).join(":")
  //   );

  const handleDeleteList = async () => {
    await axios.delete(`/list/${data.id}`);

    const data1 = [...state];
    data1.splice(index, 1);

    setState(data1);
    toast.success("deleted");
  };

  return (
    <div className="py-4 px-14">
      {open ? (
        <Modal
          width={25}
          onClose={() => setOpen(false)}
          title={"Are you sure ?"}
        >
          <div className="flex justify-around p-5">
            <button
              onClick={handleDeleteList}
              className="p-5 rounded-2xl hover:text-white hover:bg-red-500 px-10 py-2"
            >
              Yes
            </button>
            <button
              className="p-5 rounded-2xl hover:text-white hover:bg-blue-500 px-10 py-2"
              onClick={() => setOpen(false)}
            >
              No
            </button>
          </div>
        </Modal>
      ) : null}
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
            {e ? <label className="text-red-500">Number only</label> : null}
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
                {t ? (
                  <div className="text-red-500">plase select category</div>
                ) : null}
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

          <div className="flex justify-between">
            <div role="button" onClick={() => setOpen(true)}>
              <ImBin className="text-red-500 text-2xl" />
            </div>
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
