import React, { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full m-auto   transition duration-300 animate-fadeIn">
      <div className="relative">
        <img className="rounded-t-md w-full" src={url + "/images/" + image} alt={image} />
        {!cartItems[id] ?
          <img onClick={() => addToCart(id)} className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full"
            src={assets.add_icon_white}
            alt="white-icon" />
          :
          <div className="absolute bottom-4 right-4 flex items-center gap-3 p-2 rounded-full bg-white">
            <img onClick={() => removeFromCart(id)} className="cursor-pointer w-7"
              src={assets.remove_icon_red}
              alt="red-icon" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} className="cursor-pointer w-7" src={assets.add_icon_green} alt="green-icon" />
          </div>
        }
      </div>
      <div className="py-5 px-2">
        <div className="flex justify-between items-center mb-0">
          <p className="text-lg font-medium">{name}</p>
          <img src={assets.rating_starts} alt="rating-stars" />
        </div>
        <p className="text-[#676767] text-xs">{description}</p>
        <p className="text-[tomato] text-xl font-medium my-2">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
