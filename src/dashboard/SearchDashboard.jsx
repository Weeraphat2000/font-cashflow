import React from "react";
import PieGraph from "../graph/PieGraph";
import DoughnutGraph from "../graph/DoughnutGraph";
import LineGraphForSearch from "../graph/LineGraphForSearch";

function SearchDashboard({ data, dataLine }) {
  console.log(data);
  return (
    <>
      <div className="flex justify-center gap-[5vw] border border-collapse">
        <div>
          <PieGraph data={data} />
        </div>
        <div>
          <DoughnutGraph data={data} />
        </div>
      </div>

      <div>
        <LineGraphForSearch dataLine={dataLine} />
      </div>
    </>
  );
}

export default SearchDashboard;
