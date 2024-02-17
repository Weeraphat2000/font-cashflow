import React from "react";
import PieGraph from "../graph/PieGraph";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../configs/axios";
import DoughnutGraph from "../graph/DoughnutGraph";
import LineGraph from "../graph/LineGraph";

function MonthDashboard() {
  const [data, setData] = useState([]);
  const [dataLine, setDataLine] = useState([]);

  const run = async () => {
    const result = await axios.get("/dashboard/current-month");

    // console.log(result);
    setData(result.data.data);
  };
  const runLine = async () => {
    const result = await axios.get("/dashboard/current-month-line");

    console.log(result.data.data);

    const arr = [...result.data.data];
    // console.log(+arr[0].date.split("T")[0].split("-")[2] + 1);
    // console.log(arr[0].date);
    // console.log(typeof arr[0].date);

    // const currentDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); // วันปัจจุบัน
    // console.log(currentDate);
    // setDataLine(result.data.data);
  };

  useEffect(() => {
    run();
    runLine();
  }, []);

  return (
    <div className="flex">
      <div>
        <PieGraph data={data} />
      </div>
      <div>
        <DoughnutGraph data={data} />
      </div>
      <div>
        <LineGraph data={dataLine} />
      </div>
    </div>
  );
}

export default MonthDashboard;
