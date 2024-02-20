import React from "react";
import DoughnutGraph from "../graph/DoughnutGraph";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../configs/axios";
import PieGraph from "../graph/PieGraph";

function DayDashboard() {
  const [data, setData] = useState([]);

  const run = async () => {
    const result = await axios.get("/dashboard/current-date");
    setData(result.data.data);
  };

  useEffect(() => {
    run();
  }, []);
  return (
    <div className="flex justify-center gap-[5vw] border border-collapse">
      <div>
        <PieGraph data={data} />
      </div>
      <div>
        <DoughnutGraph data={data} />
      </div>
    </div>
  );
}

export default DayDashboard;
