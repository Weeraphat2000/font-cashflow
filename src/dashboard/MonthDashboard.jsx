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

    setDataLine(result.data.data);
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
