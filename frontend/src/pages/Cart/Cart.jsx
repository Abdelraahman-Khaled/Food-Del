import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  // navigate
  const navigate = useNavigate();
  return (
    <div className="cart mt-24 ">
      <div className="cart-items text-center">
        <div className=" grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[grey] font-max[(1vw,12px)] ">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        <div>
          {food_list.map((item, index) => {
            if (cartItems[item._id]) {
              return (
                <>
                  <div className=" my-3 text-black  grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center font-max[(1vw,12px)]">
                    <div className="flex justify-center">
                      <img className="w-14 " src={url + "/images/" + item.image} alt={item.name} />
                    </div>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      className="cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </p>
                  </div>
                  <hr className="h-[1px] bg-[#e2e2e2] border-none" />
                </>
              );
            }
          })}
        </div>
      </div>
      {/* Checking out */}
      <div className="cart-bottom  flex-col-reverse md:flex-row mt-20 flex justify-between gap-[max(12vw,20px)]">
        <div className="cart-total flex-1 flex flex-col gap-5">
          <h2 className="font-semibold text-2xl">Cart Totals</h2>
          <div>
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-3" />
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr className="my-3" />
            <div className="cart-total-details flex justify-between text-[#555]">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => { navigate('/order') }} className="text-sm xl:text-base border-none text-white bg-[tomato] w-[max(15vw,200px)] py-3 cursor-pointer rounded  hover:bg-orange-600 transition duration-300">
            PROCEED TO CHECKOUT
          </button>
        </div>
        {/* Promo Code */}
        <div className="cart-promocode flex-1 ">
          <p className="text-[#555]">
            If you have a promo code , Enter it here
          </p>
          <div className="cart-promocode-input mt-3 flex justify-between items-center bg-[#eaeaea] rounded-e">
            <input
              type="text"
              placeholder="promo code"
              className="bg-transparent border-none outline-none pl-3"
            />
            <button className="w-[max(10vw,150px)] p-[12px_5px] bg-black border-none text-white rounded-e">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
