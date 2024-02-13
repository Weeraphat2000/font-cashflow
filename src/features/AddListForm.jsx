import axios from "../configs/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useMyContext from "../hooks/useContext";

function AddListForm() {
  const { categoryList } = useMyContext();
  const [insert, setInsert] = useState({
    amonut: "",
    categoryId: "",
    note: "",
    transactionType: "",
    createdAt: "",
  });
  const handleChange = (e) => {
    setInsert({ ...insert, [e.target.name]: e.target.value });
  };

  console.log(insert);
  return (
    <div className="py-4 px-14">
      <form onSubmit={() => {}}>
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
              name="amonut"
              value={insert.amonut}
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
          </div>

          {insert.transactionType == "EXPENSE" ? (
            <div>
              <div>Category</div>
              <select name="categoryId" id="" onChange={handleChange}>
                {categoryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex justify-between">
            <button type="button" onClick={() => {}}>
              del
            </button>
            <button>submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddListForm;
