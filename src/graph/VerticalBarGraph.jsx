import React from "react";
import { Bar } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const options = {
//   scales: { y: { min: 0, max: 100 } },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

// const dataa = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 10, 10],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [20, 20, 20],
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

function VerticalBarGraph({ data }) {
  const max = Math.max(...data.map((item) => item.sum)) * 1.1;

  const dayExpense = data.filter((item) => item.TransactionType == "EXPENSE");
  const dayIncome = data.filter((item) => item.TransactionType == "INCOME");

  const expense = [];
  const income = [];

  let startIndexIncome = 0;
  let startIndexExpense = 0;
  for (let i = 1; i < 13 + 1; i++) {
    if (+dayExpense[startIndexExpense]?.month == i) {
      expense.push(dayExpense[startIndexExpense].sum);
      startIndexExpense += 1;
    } else {
      expense.push(0);
    }

    if (+dayIncome[startIndexIncome]?.month == i) {
      income.push(dayIncome[startIndexIncome].sum);
      startIndexIncome += 1;
    } else {
      income.push(0);
    }
  }

  const datashow = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: expense,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Income",
        data: income,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: { y: { min: 0, max: max } },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={datashow} />
    </div>
  );
}

export default VerticalBarGraph;
