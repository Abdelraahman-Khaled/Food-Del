import React from "react";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExplorMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5" id="explor-meu">
      <h1 className="text-[#262626] font-medium text-4xl">Explor our menu</h1>
      <p className="lg:max-w-[60%] text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining
        experience.oone delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-8 text-center my-5 mx-0 overflow-x-auto ">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
              }}
              key={index}
              className="explor-menu-list-item cursor-pointer"
            >
              <img
                className={`w-28 min-w-20 rounded-full transition duration-200 ${
                  category === item.menu_name && "circle-active"
                }`}
                src={item.menu_image}
                alt={item.menu_image}
              />
              <p className="mt-[10px] text-[#747474] text-[max(1.4vw,16px)]">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-[10px] h-[2px] bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExplorMenu;
