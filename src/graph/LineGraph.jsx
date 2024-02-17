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
  console.log(data);
  const line = {
    labels: label,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 200, 400],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [500, 700, 300],
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
