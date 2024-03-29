import axios from "../configs/axios";
import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import AddListForm from "../features/AddListForm";
import { useEffect } from "react";
import Card from "../components/Card";
import { listCurrentDate } from "../apis/list";
import { toast } from "react-toastify";
import { GrUpload } from "react-icons/gr";

function HomePage() {
  const [onAdd, setOnAdd] = useState(false);
  const [allListToday, setAllListToday] = useState([]);

  const fetchListCurrentDate = async () => {
    try {
      const data = await listCurrentDate();
      setAllListToday(data.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  //
  //
  //
  //
  // const editFunc = async (dataUpdate, state, setState, id) => {
  // const data = array.map((a) => Object.assign({}, a));
  // เอามาเช็ควันเฉยๆ
  // if (DATA.data.data.createdAt.slice(0, 10) != Currentdate.slice(0, 10)) {
  //   return;
  // }
  // for (let i of data) {
  //   if (i.id == id) {
  //     i.body = update;
  //   }
  //   // return data
  // }
  // return data;
  // setstate(data)
  // };
  //
  //
  //
  //
  const sum = allListToday.reduce((acc, item) => {
    if (item.categoryId == 1) {
      acc += item.amount;
    } else {
      acc -= item.amount;
    }
    return acc;
  }, 0);

  useEffect(() => {
    fetchListCurrentDate();
  }, []);
  return (
    <div className="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-500 h-[calc(100vh-56px)] overflow-auto">
      <div className="w-[70vw] bg-red-">
        <div className="flex justify-between">
          <div className="invisible">
            <button className="invisible">s</button>
          </div>
          <div
            className={`${
              sum >= 0 ? "text-green-500" : "text-red-500"
            } p-5 text-4xl bg-white rounded my-4  w-[60vw] text-center`}
          >
            {sum.toLocaleString("en-US", {
              style: "currency",
              currency: "THB",
            })}
          </div>

          <button
            onClick={() => {
              setOnAdd((r) => !r);
            }}
          >
            <div>
              <GrUpload className="scale-[200%] text-white" />
            </div>
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
            {allListToday.map((item, index) => (
              <Card
                index={index}
                key={item.id}
                data={item}
                // editFunc={editFunc}
                setState={setAllListToday}
                state={allListToday}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
