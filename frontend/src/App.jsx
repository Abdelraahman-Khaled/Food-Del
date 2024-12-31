import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import AuthPopup from "./components/AuthPopup/AuthPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [token, setToken] = useState(null); // Manage token state
  const [visiblePopup, setVisiblePopup] = useState(null); // "login" or "signup"

  const togglePopup = (type) => {
    setVisiblePopup(type);
  };

  const closePopup = () => {
    setVisiblePopup(null);
  };

  // Load token from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <>
      {visiblePopup && (
        <AuthPopup
          closePopup={closePopup}
          isLogin={visiblePopup === "login"}
          onLogin={(token) => {
            setToken(token); // Save token to state
            localStorage.setItem("token", token); // Persist token to localStorage
            closePopup();
          }}
        />
      )}
      <div className="app">
        <Navbar
          token={token}
          toggleLoginPopup={() => togglePopup("login")}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
