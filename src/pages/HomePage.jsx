import axios from "../configs/axios";
import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import AddListForm from "../features/AddListForm";
import { useEffect } from "react";
import Card from "../components/Card";
import { listCurrentDate } from "../apis/list";

function HomePage() {
  const [onAdd, setOnAdd] = useState(false);
  const [allListToday, setAllListToday] = useState([]);

  const fetchListCurrentDate = async () => {
    try {
      const data = await listCurrentDate();
      setAllListToday(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //
  //
  const handleEdit = async (id, dataUpdate, state, setState) => {
    // const edit = await axios.

    const data = array.map((a) => Object.assign({}, a));

    for (let i of data) {
      if (i.id == id) {
        i.body = update;
      }
      // return data
    }
    return data;
    // setstate(data)
  };
  //
  //

  useEffect(() => {
    fetchListCurrentDate();
  }, []);
  console.log(allListToday);
  return (
    <div className="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-500 h-[calc(100vh-56px)] overflow-auto">
      <div className="w-[70vw]">
        <div className="bg-rose-300 flex justify-between">
          <div></div>
          <button
            onClick={() => {
              setOnAdd((r) => !r);
            }}
          >
            add
          </button>
          {onAdd && (
            <Modal width={25} title={"Create"} onClose={() => setOnAdd(false)}>
              <AddListForm
                onClose={() => setOnAdd(false)}
                setAllListToday={setAllListToday}
                allListToday={allListToday}
              />
            </Modal>
          )}
        </div>
        <div className="flex justify-center">
          <div className="w-[60vw] flex flex-col gap-4 mt-4">
            {allListToday.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
