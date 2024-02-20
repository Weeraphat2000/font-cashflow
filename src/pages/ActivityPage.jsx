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
          <div>
            <input type="date" onChange={handleChange} value={search} />
            <button onClick={() => setSearch("")}>reset</button>
          </div>
          <div className="w-[60vw] flex flex-col gap-4 mt-4">
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
