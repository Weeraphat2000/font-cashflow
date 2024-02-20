import React from "react";
import VerticalBarGraph from "../graph/VerticalBarGraph";
import PieGraph from "../graph/PieGraph";
import DoughnutGraph from "../graph/DoughnutGraph";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../configs/axios";
import { toast } from "react-toastify";

function YearDashboard() {
  const [data, setData] = useState([]);
  const [bardata, setBarData] = useState([]);

  const run = async () => {
    try {
      const result = await axios.get("/dashboard/current-year");

      setData(result.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const runBar = async () => {
    try {
      const result = await axios.get("/dashboard/current-yaer-bar");
      setBarData(result.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    run();
    runBar();
  }, []);
  return (
    <div>
      <div className="flex">
        <div>Current year</div>
        <div>
          <PieGraph data={data} />
        </div>
        <div>
          <DoughnutGraph data={data} />
        </div>
      </div>
      <div className="w-[1000px]">
        <VerticalBarGraph data={bardata} />
      </div>
    </div>
  );
}

export default YearDashboard;
