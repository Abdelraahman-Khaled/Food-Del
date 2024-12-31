import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvier = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null)
  const [food_list, setFoodList] = useState([])
  const url = import.meta.env.VITE_API_URL;

  // Add the item to cart and adding same product if exist
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    } if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }
  }


  // Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/remove`, // Ensure `url` is properly defined
          { itemId }, // Pass `itemId` in the request body
          { headers: { token } } // Attach the `token` in headers
        );
        console.log("Remove response:", response.data);
      } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
      }
    }
  };



  // get total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
        // console.log(itemInfo); object
        // console.log(cartItems); object of items
        // console.log(item); id
      }
    }
    return totalAmount;
  };

  // fetch foodList
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list")
    setFoodList(response.data.data)
  }
  // load cart data
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
    setCartItems(response.data.cartData)
  }
  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  // Retrieve token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    async function loadData() {
      await fetchFoodList()
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken)
      }
    }
    loadData()
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount, url, token, setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvier;
