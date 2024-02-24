import React from "react";
import { Bar } from "react-chartjs-2";

function LineGraphForSearch({ dataLine }) {
  console.log(dataLine);
  const max = Math.max(...dataLine.map((item) => item.sum)) * 1.1;

  const dayExpense = dataLine.filter(
    (item) => item.TransactionType == "EXPENSE"
  );
  const dayIncome = dataLine.filter((item) => item.TransactionType == "INCOME");

  const labels = [];
  for (let i = 0; i < dataLine.length; i++) {
    if (!labels.includes(dataLine[i].date.slice(0, 10))) {
      labels.push(dataLine[i].date.slice(0, 10));
    }
  }
  const expense = [];
  const income = [];

  let startIndexIncome = 0;
  let startIndexExpense = 0;
  for (let i = 0; i < labels.length; i++) {
    if (dayExpense[startIndexExpense]?.date.includes(labels[i])) {
      expense.push(dayExpense[startIndexExpense].sum);
      startIndexExpense += 1;
    } else {
      expense.push(0);
    }

    if (dayIncome[startIndexIncome]?.date.includes(labels[i])) {
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
    <>
      <Bar options={options} data={datashow} />
      {/* <div>asdf</div> */}
    </>
  );
}

export default LineGraphForSearch;
