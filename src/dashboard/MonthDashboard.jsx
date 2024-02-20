import React from "react";
import PieGraph from "../graph/PieGraph";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../configs/axios";
import DoughnutGraph from "../graph/DoughnutGraph";
import LineGraph from "../graph/LineGraph";
import { toast } from "react-toastify";

function MonthDashboard() {
  const [data, setData] = useState([]);
  const [dataLine, setDataLine] = useState([]);

  const run = async () => {
    try {
      const result = await axios.get("/dashboard/current-month");
      setData(result.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const runLine = async () => {
    try {
      const result = await axios.get("/dashboard/current-month-line");
      setDataLine(result.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    run();
    runLine();
  }, []);

  return (
    <div className="flex flex-col items-center border">
      <div className="flex justify-center gap-[5vw]">
        <div>
          <PieGraph data={data} />
        </div>
        <div>
          <DoughnutGraph data={data} />
        </div>
      </div>
      <div className="w-[1000px] h-[500px]">
        <LineGraph data={dataLine} />
      </div>
    </div>
  );
}

export default MonthDashboard;
