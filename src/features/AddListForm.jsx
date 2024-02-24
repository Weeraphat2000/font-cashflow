import axios from "../configs/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useMyContext from "../hooks/useContext";
import { addList } from "../apis/list";
import dateFormat from "dateformat";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import validateCreateList from "./validations/validate-createList";

function AddListForm({ onClose, setAllListToday, allListToday }) {
  const [date, setDate] = useState("");
  const [hr, setHr] = useState("");
  const [error, setError] = useState({
    amount: "",
    categoryId: "1",
    note: "",
    transactionType: "",
    createdAt: "",
  });
  const { categoryList } = useMyContext();
  const [insert, setInsert] = useState({
    amount: "",
    categoryId: "1",
    note: "",
    transactionType: "",
    createdAt: "",
  });

  //
  const Currentdate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss.ms'Z'");
  //

  const handleChange = (e) => {
    setError({ ...error, [e.target.name]: "" });

    if (e.target.name == "amount" && isNaN(+e.target.value)) {
      setError({ ...error, amount: "only number" });
      return;
    }

    const list = {
      ...insert,
      [e.target.name]: e.target.value,
    };
    if (list.transactionType == "INCOME") {
      list.categoryId = 1;
    }

    setInsert(list);
  };

  const handlSubmit = async (e) => {
    try {
      e.preventDefault();

      const isPassCreate = validateCreateList({
        amount: insert.amount,
        transactionType: insert.transactionType,
      });
      if (isPassCreate) {
        setError(isPassCreate);
        return;
      }
      if (insert.transactionType == "EXPENSE" && insert.categoryId == 1) {
        setError({ ...error, categoryId: "please select category" });
        return;
      }

      if ((date && !hr) || (!date && hr)) {
        setError({ ...error, createdAt: "please select date and time" });
        return;
      }
      const data = { ...insert };
      if (date) {
        data.createdAt = date + "T" + hr + ":00.000Z";
      } else {
        data.createdAt = Currentdate;
      }

      if (
        new Date(new Date().setHours(new Date().getHours() + 8)).toISOString() <
        data.createdAt
      ) {
        toast.error("date is invalid");
        return;
      }
      console.log(data);
      // console.log(
      //   new Date(new Date().setHours(new Date().getHours() + 8)).toISOString()
      // );
      // console.log(data.createdAt);
      // console.log(
      //   new Date(new Date().setHours(new Date().getHours() + 8)).toISOString() <
      //     data.createdAt
      // );

      const DATA = await addList(data);
      onClose();

      if (DATA.data.data.createdAt.slice(0, 10) != Currentdate.slice(0, 10)) {
        return;
      }
      const index = allListToday.findIndex(
        (item) => item.createdAt < DATA.data.data.createdAt
      );
      const array = [...allListToday];
      array.splice(index, 0, DATA.data.data);
      setAllListToday(array);
      toast.success("created");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

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
              value={insert.amount}
            />
            {error.amount ? (
              <label htmlFor="" className="text-red-500">
                {error.amount}
              </label>
            ) : null}
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
              value={insert.note}
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
                />
                <label htmlFor="income">Income</label>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="transactionType"
                  id="expense"
                  value={"EXPENSE"}
                />
                <label htmlFor="expense">Expense</label>
              </div>
            </div>
            {error.transactionType ? (
              <label htmlFor="" className="text-red-500">
                {error.transactionType}
              </label>
            ) : null}
          </div>

          {insert.transactionType == "EXPENSE" ? (
            <>
              <div>
                <div>Category</div>
                <select
                  name="categoryId"
                  id=""
                  value={insert.categoryId}
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
              {error.categoryId != "1" ? (
                <label htmlFor="" className="text-red-500">
                  {error.categoryId}
                </label>
              ) : null}
            </>
          ) : null}
          <div>
            <div className="flex gap-5">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError({ ...error, createdAt: "" });
                }}
              />
              <input
                type="time"
                max={"24:00"}
                min={"00:00"}
                value={hr}
                onChange={(e) => {
                  setHr(e.target.value);
                  setError({ ...error, createdAt: "" });
                }}
              />
            </div>
            {error.createdAt ? (
              <label htmlFor="" className="text-red-500">
                {error.createdAt}
              </label>
            ) : null}
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

export default AddListForm;
