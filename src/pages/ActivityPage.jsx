import React from "react";
import { useState } from "react";
import { fetchAllList } from "../apis/list";
import { useEffect } from "react";
import Card from "../components/Card";

function ActivityPage() {
  const [allList, setAllList] = useState([]);
  const run = async () => {
    const data = await fetchAllList();
    console.log(data);
    setAllList(data.data.data);
  };
  useEffect(() => {
    run();
  }, []);
  console.log(allList);
  return (
    <div className="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-500 h-[calc(100vh-80px)] overflow-auto">
      <div className="w-[70vw]">
        <div className="flex justify-center">
          <div className="w-[60vw] flex flex-col gap-4 mt-4">
            {allList.map((item) => (
              <Card key={item.id} data={item} all={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
