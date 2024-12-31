import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  // useState to strore from data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  // onChangeHandeler to handle the form 
  const onChangeHandeler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  // placeorder
  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data
      window.location.replace(session_url)
    } else {
      console.log(response.data);
      alert("Error")
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      alert("login please")
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      alert("there is no amount")
      navigate('/cart')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-between bg-gray-50">
      {/* Delivery Information Form */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
        <form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.firstName}
              name="firstName"
              type="text"
              placeholder="First name"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {/* Last Name */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.lastName}
              name="lastName"
              type="text"
              placeholder="Last name"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            {/* Email Address */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.email}
              name="email"
              type="email"
              placeholder="Email address"
              className="col-span-1 sm:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            {/* Street Address */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.street}
              name="street"
              type="text"
              placeholder="Street"
              className="col-span-1 sm:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            {/* City */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.city}
              name="city"
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {/* State */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.state}
              name="state"
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            {/* Zip Code */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.zipcode}
              name="zipcode"
              type="text"
              placeholder="Zip code"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {/* Country */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.country}
              name="country"
              type="text"
              placeholder="Country"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            {/* Phone */}
            <input
              required
              onChange={onChangeHandeler}
              value={data.phone}
              name="phone"
              type="text"
              placeholder="Phone"
              className="col-span-1 sm:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          {/* Cart Totals */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-gray-600">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center text-gray-600">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <b>Total</b>
                <b>${getTotalCartAmount() + 2}</b>
              </div>

              {/* Button */}
              <button type="sumbit" className="text-sm xl:text-base border-none text-white bg-[tomato] w-[max(15vw,200px)] py-3 cursor-pointer rounded  hover:bg-orange-600 transition duration-300">
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default PlaceOrder;
