import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Items = ({ item, pathname }) => {
  return (
    <div>
      <Link to={item.to}>
        <div
          className={`py-4 px-8 ${
            pathname == item.to
              ? item.to == "/summary"
                ? "bg-white text-black rounded-t-2xl"
                : "bg-cyan-500 rounded-t-2xl"
              : "hover:underline"
          }`}
        >
          {item.title}
        </div>
      </Link>
    </div>
  );
};

function Menu() {
  const { pathname } = useLocation();
  const list = [
    { title: "Home", to: "/", id: 1 },
    { title: "Activity", to: "/activity", id: 2 },
    { title: `Summary`, to: "/summary", id: 3 },
  ];
  return (
    <div className="flex gap-4 items-center">
      {list.map((item) => (
        <Items key={item.id} item={item} pathname={pathname} />
      ))}
    </div>
  );
}

export default Menu;
