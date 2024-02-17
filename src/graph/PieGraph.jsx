import React from "react";
import { Pie } from "react-chartjs-2";

const options = {
  plugins: {
    legend: {
      display: true, // แสดง label ใน legend
      position: "right", // ตำแหน่งของ legend
    },
  },
};
//   const data = {
//     labels: ["Red", "Blue", "Yellow"],
//     datasets: [
//       {
//         data: [
//           [300, 50, 100],
//           [100, 150, 200],
//           [50, 50, 25],
//         ],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

function PieGraph({ data }) {
  if (data == undefined) {
    return;
  }
  const value = [];

  let expense = 0;
  let income = 0;
  for (let i in data) {
    if (data?.[i].category_name.toLowerCase() == "income") {
      income += data?.[i].sum;
      continue;
    }
    expense += data?.[i].sum;
  }
  value.push(expense);
  value.push(income);

  const pie = {
    labels: ["Expense", "Income"],
    datasets: [
      {
        label: "THB",
        data: value,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pie} options={options}></Pie>;
}

export default PieGraph;
