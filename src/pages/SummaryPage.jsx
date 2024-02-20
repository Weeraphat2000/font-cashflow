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
import axios from "../configs/axios";
import SearchDashboard from "../dashboard/SearchDashboard";
import { toast } from "react-toastify";

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
  const [openToday, serToday] = useState(false);
  const [openMonth, serMonth] = useState(false);
  const [openYear, serYear] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);

  const [search, setSearch] = useState({ startDate: "", endDate: "" });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const a = await axios.get(
        `/dashboard/search/${search.startDate}/${search.endDate}`
      );
      setDataSearch(a.data.data);
    } catch (err) {
      toast.error("plase select startdate and enddate");
    }
  };
  const handleChang = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-[80vw] mx-auto pt-10 gap-4">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="startDate"
            onChange={handleChang}
            value={search.startDate}
          />
          <input
            type="date"
            name="endDate"
            onChange={handleChang}
            value={search.endDate}
          />
          <button className="mx-5 hover:bg-amber-500 px-4 py-2 rounded-3xl">
            submit
          </button>
          <button
            className="hover:underline"
            type="button"
            onClick={() => setDataSearch([])}
          >
            reset
          </button>
        </form>
      </div>
      {dataSearch.length > 0 ? (
        <SearchDashboard data={dataSearch} />
      ) : (
        <>
          <div className="">
            <div
              onClick={() => {
                serToday((r) => !r);
              }}
              role="button"
              className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
            >
              Today
            </div>
            {openToday ? <DayDashboard /> : null}
          </div>
          <div className="">
            <div
              role="button"
              onClick={() => {
                serMonth((r) => !r);
              }}
              className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
            >
              Current month
            </div>
            {openMonth ? <MonthDashboard /> : null}
          </div>
          <div>
            <div
              role="button"
              onClick={() => {
                serYear((r) => !r);
              }}
              className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
            >
              Currnt year
            </div>
            {openYear ? <YearDashboard /> : null}
          </div>
        </>
      )}

      {/* <div>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="startDate"
            onChange={handleChang}
            value={search.startDate}
          />
          <input
            type="date"
            name="endDate"
            onChange={handleChang}
            value={search.endDate}
          />
          <button>submit</button>
        </form>
      </div>
      <div className="">
        <div
          onClick={() => {
            serToday((r) => !r);
          }}
          role="button"
          className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
        >
          Today
        </div>
        {openToday ? <DayDashboard /> : null}
      </div>
      <div className="">
        <div
          role="button"
          onClick={() => {
            serMonth((r) => !r);
          }}
          className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
        >
          Current month
        </div>
        {openMonth ? <MonthDashboard /> : null}
      </div>
      <div>
        <div
          role="button"
          onClick={() => {
            serYear((r) => !r);
          }}
          className="px-5 py-2 w-40 text-center rounded-t-lg border-x border-t border-b-white text-gray-600 text-2xl translate-y-[1px] z-10 bg-white"
        >
          Currnt year
        </div>
        {openYear ? <YearDashboard /> : null}
      </div> */}
    </div>
  );
}

export default SummaryPage;
