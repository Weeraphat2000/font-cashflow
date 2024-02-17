import React from "react";
import { Bar } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const options = {
  scales: { y: { min: 0, max: 100 } },
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

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 10, 10],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [20, 20, 20],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function VerticalBarGraph() {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default VerticalBarGraph;
