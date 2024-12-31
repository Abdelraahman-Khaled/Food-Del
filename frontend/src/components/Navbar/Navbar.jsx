import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ toggleLoginPopup }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navItems = [
    { name: "Home", id: "1", link: "/" },
    { name: "Menu", id: "2", link: "/menu" },
    { name: "Mobile-App", id: "3", link: "/app" },
    { name: "Contact Us", id: "4", link: "/contact" },
  ];

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Clear token from localStorage
  };
  const navigate = useNavigate()
  return (
    <nav className="py-4 px-5 lg:px-10 flex justify-between items-center bg-white shadow-md">
      {/* Logo */}
      <Link to="/">
        <img className="w-[120px] lg:w-[150px]" src={assets.logo} alt="logo" />
      </Link>

      {/* Navigation Menu */}
      <ul
        className={`absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:flex gap-8 text-customMain text-base font-medium z-10 lg:shadow-none transition-transform ${isMenuOpen
          ? "translate-y-0 shadow-lg"
          : "translate-y-[-200%] lg:translate-y-0"
          }`}
      >
        {navItems.map((item) => (
          <Link to={item.link} key={item.id}>
            <li
              onClick={() => {
                setMenu(item.id);
                setIsMenuOpen(false); // Close menu on mobile when clicked
              }}
              className={`cursor-pointer py-4 px-5 lg:p-0 hover:text-[tomato] ${menu === item.id
                ? "text-[tomato] border-b-2 lg:border-none border-[tomato]"
                : ""
                }`}
            >
              {item.name}
            </li>
          </Link>
        ))}
        {!token && (
          <button
            onClick={() => toggleLoginPopup(true)}
            className="mb-6 lg:mb-0 lg:hidden bg-transparent text-customMain border border-[tomato] py-2 px-6 rounded-full transition hover:bg-[#fff4f2]"
          >
            Sign in
          </button>
        )}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <img
          className="cursor-pointer w-5"
          src={assets.search_icon}
          alt="search-icon"
        />
        <div className="relative">
          <Link to="/cart">
            <img
              className="cursor-pointer w-5"
              src={assets.basket_icon}
              alt="basket-icon"
            />
          </Link>
          {getTotalCartAmount() > 0 && (
            <span className="absolute top-[-5px] right-[-5px] w-3 h-3 bg-[tomato] rounded-full"></span>
          )}
        </div>

        {/* Conditional Profile or Sign In */}
        {!token ? (
          <button
            onClick={() => toggleLoginPopup(true)}
            className="hidden lg:block bg-transparent text-customMain border border-[tomato] py-2 px-6 rounded-full transition hover:bg-[#fff4f2]"
          >
            Sign in
          </button>
        ) : (
          <div
            className="navbar-profile relative cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img src={assets.profile_icon} alt="profile-icon" />
            {isProfileMenuOpen && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 w-40 z-10">
                <li onClick={() => navigate('/myorders')} className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <img src={assets.bag_icon} alt="bag" className="w-4 mr-2" />
                  <p>Orders</p>
                </li>
                <hr />
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  <img
                    src={assets.logout_icon}
                    alt="logout"
                    className="w-4 mr-2"
                  />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Hamburger Menu */}
        <button
          className="block lg:hidden text-customMain"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            className="w-[24px]"
            src={isMenuOpen ? assets.close : assets.burger}
            alt="menu-icon"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
