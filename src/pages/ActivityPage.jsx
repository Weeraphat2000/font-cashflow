import React from "react";
import { useState } from "react";
import { fetchAllList } from "../apis/list";
import { useEffect } from "react";
import Card from "../components/Card";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function ActivityPage() {
  const [allList, setAllList] = useState([]);
  const [count, setCount] = useState(20);
  const run = async () => {
    try {
      const data = await fetchAllList(0, count);
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
    if (allList.filter((item) => item.createdAt.includes(search)) == 0) {
      setHasMore(false);
    }
  }, [search]);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = async () => {
    //

    console.log("first");
    const data = await fetchAllList(count, count + 10);
    console.log(data);
    if (data.data.data.length == 0) {
      setHasMore(false);
    }
    setCount(count + 10);
    setAllList([...allList, ...data.data.data]);
    // setHasMore(false);
  };

  return (
    <div className="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-500 min-h-[calc(100vh-56px)] overflow-auto">
      <div className="w-[70vw]">
        <InfiniteScroll
          dataLength={allList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
        >
          <div className="flex justify-center">
            <div className="w-[60vw] flex flex-col gap-4 mt-4">
              <div className="flex justify-center gap-4 bg-white rounded-lg">
                <div className="flex items-center">
                  select date transaction :
                </div>
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ActivityPage;
