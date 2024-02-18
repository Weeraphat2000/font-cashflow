import React from "react";
import VerticalBarGraph from "../graph/VerticalBarGraph";
import PieGraph from "../graph/PieGraph";
import DoughnutGraph from "../graph/DoughnutGraph";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../configs/axios";

function YearDashboard() {
  const [data, setData] = useState([]);

  const run = async () => {
    const result = await axios.get("/dashboard/current-year");

    setData(result.data.data);
  };
  useEffect(() => {
    run();
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
        <VerticalBarGraph />
      </div>
    </div>
  );
}

export default YearDashboard;
