import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function AuthPopup({ closePopup }) {
  const { url, setToken } = useContext(StoreContext);

  // State for toggling between Login and Register
  const [isLogin, setIsLogin] = useState(true);

  // State for saving form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (isLogin) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          closePopup()
        } else {
          alert("Registration successful! Please log in.");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          closePopup()
        }
      } else {
        alert(response.data.message);
        console.log("errr");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name:
              </label>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[tomato]"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[tomato]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[tomato]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[tomato] text-white py-2 rounded-md hover:bg-[#f85b3f] transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          {isLogin
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[tomato] hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPopup;
