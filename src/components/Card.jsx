import React from "react";
import dateFormat from "dateformat";
import useMyContext from "../hooks/useContext";

function Card({ data, all }) {
  const { categoryId, amount, note, transactionType, category, createdAt } =
    data;

  //   const date = "a";
  // const date = createdAt
  //   .split("T")[1]
  //   .split(".")[0]
  //   .split(":")
  //   .slice(0, 2)
  //   .join(":");

  const date =
    (all ? createdAt.split("T")[0] + " " : "") +
    createdAt.split("T")[1].split(".")[0].split(":").slice(0, 2).join(":");

  //   console.log(a);
  //   const date = dateFormat(createdAt, "h:MM");
  //   console.log(createdAt);

  return (
    <div
      role="button"
      className="bg-white rounded-lg p-4 hover:scale-110 transition dulation-500 hover:shadow-[0_0_16px_#D9D9D9]"
    >
      <div className="flex justify-between">
        <div>
          <div className="text-xl">{category.categoryName}</div>
          <div>note : {note}</div>
        </div>
        <div>
          <div
            className={`text-4xl text-end ${
              transactionType == "INCOME" ? "text-[#2e8d4e]" : "text-red-400"
            }`}
          >
            {amount} ฿
          </div>
          <div className="text-end">{date}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
