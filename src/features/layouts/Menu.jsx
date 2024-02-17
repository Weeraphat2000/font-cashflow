import React from "react";
import { Link } from "react-router-dom";

const Items = ({ item }) => {
  return (
    <div>
      <Link to={item.to}>
        <div className="p-4">{item.title}</div>
      </Link>
    </div>
  );
};

function Menu() {
  const list = [
    { title: "Home", to: "/", id: 1 },
    { title: "Activity", to: "/activity", id: 2 },
    { title: `Summary`, to: "/summary", id: 3 },
  ];
  return (
    <div className="flex gap-4 items-center">
      {list.map((item) => (
        <Items key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Menu;
