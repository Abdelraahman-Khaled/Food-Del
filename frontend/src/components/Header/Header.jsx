import React from "react";
import headerImg from '../../assets/frontend_assets/header_img.png'
const Header = () => {
  return (
    <div
      className=" h-[34vw] m-[30px_auto] flex items-center min-w-1/2"
      style={{
        backgroundImage: `url(${headerImg})`,
        backgroundSize: "contain",
        position: "relative",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" max-w-[48%] md:max-w-[50%] ml-5  sm:ml-16 md:mdl-28 flex flex-col items-start gap-5  lg:max-w-[50%]  animate-fadeIn">
        <h2 className="font-medium text-white text-[4.7vw]  leading-tight ">
          Order your favorite food here
        </h2>
        <p className="hidden md:block text-white md:text-[1vw] text-[10px]">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted withthe finest ingredients and culinary expertis. Our mission
          is to satisfy your crovings and elevate your dining experience , one
          delicious meal at a time .
        </p>
        <button className="text-xs lg:text-lg sm:text-base px-5  sm:px-7 h-[30px] sm:h-[40px] lg:h-[50px] text-[#747474] font-medium   bg-white rounded-[50px] transition duration-300 hover:text-[tomato]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
