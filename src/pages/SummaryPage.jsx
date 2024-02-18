import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";
import DayDashboard from "../dashboard/DayDashboard";
import MonthDashboard from "../dashboard/MonthDashboard";
import YearDashboard from "../dashboard/YearDashboard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

export function SummaryPage() {
  const [test, setTest] = useState([]);
  return (
    <div>
      <div className="w-96">
        <DayDashboard />
      </div>
      <div className="w-96">
        <MonthDashboard />
      </div>
      <div className="w-96">
        <YearDashboard />
      </div>
    </div>
  );
}

export default SummaryPage;
