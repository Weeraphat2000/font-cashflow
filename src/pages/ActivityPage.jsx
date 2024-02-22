import React from "react";
import { useState } from "react";
import { fetchAllList } from "../apis/list";
import { useEffect } from "react";
import Card from "../components/Card";
import { toast } from "react-toastify";

function ActivityPage() {
  const [allList, setAllList] = useState([]);
  const run = async () => {
    try {
      const data = await fetchAllList();
      setAllList(data.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const [search, setSearch] = useState("");

  const [searchlist, setSearchList] = useState([]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setSearchList(allList.filter((item) => item.createdAt.includes(search)));
    run();
  }, [search]);

  return (
    <div className="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-500 h-[calc(100vh-56px)] overflow-auto">
      <div className="w-[70vw]">
        <div className="flex justify-center">
          <div className="w-[60vw] flex flex-col gap-4 mt-4">
            <div className="flex justify-center gap-4 bg-white rounded-lg">
              <div className="flex items-center">select date transaction :</div>
              <input
                // className="bg-cyan-500"
                type="date"
                onChange={handleChange}
                value={search}
              />
              <button
                className="hover:bg-red-500 hover:scale-110 transition dulation-500 text-white px-4 py-1 bg-green-500 my-2 rounded-xl"
                onClick={() => setSearch("")}
              >
                reset
              </button>
            </div>
            {search
              ? searchlist.map((item, index) => (
                  <Card
                    index={index}
                    key={item.id}
                    data={item}
                    all={true}
                    setState={setSearchList}
                    state={searchlist}
                  />
                ))
              : allList.map((item, index) => (
                  // <Card
                  //   index={index}
                  //   key={item.id}
                  //   data={item}
                  //   // editFunc={editFunc}
                  //   setState={setAllListToday}
                  //   state={allListToday}
                  // />

                  <Card
                    index={index}
                    key={item.id}
                    data={item}
                    all={true}
                    setState={setAllList}
                    state={allList}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
