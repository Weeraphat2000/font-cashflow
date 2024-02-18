import { Line } from "react-chartjs-2";
import React from "react";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const label = ["January", "February", "March", "April", "May", "June", "July"];

function LineGraph({ data }) {
  const today = new Date().toISOString();

  const dayExpense = data.filter((item) => item.TransactionType == "EXPENSE");
  const dayIncome = data.filter((item) => item.TransactionType == "INCOME");

  const n = +today.slice(8, 10);
  const expense = [];
  const income = [];
  const len = [];
  let startIndexIncome = 0;
  let startIndexExpense = 0;
  for (let i = 1; i < n + 1; i++) {
    if (+dayExpense[startIndexExpense]?.date.slice(8, 10) == i) {
      expense.push(dayExpense[startIndexExpense].sum);
      startIndexExpense += 1;
    } else {
      expense.push(0);
    }

    if (+dayIncome[startIndexIncome]?.date.slice(8, 10) == i) {
      income.push(dayIncome[startIndexIncome].sum);
      startIndexIncome += 1;
    } else {
      income.push(0);
    }
    len.push(i);
  }
  //   console.log("data", data);
  //   console.log("income", income);
  //   console.log("expense", expense);
  //   console.log("len", len);

  //
  const line = {
    labels: len,
    datasets: [
      {
        label: "Expense",
        data: expense,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Income",
        data: income,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="w-96 h-96">
      <Line options={options} data={line} />
    </div>
  );
}

export default LineGraph;
