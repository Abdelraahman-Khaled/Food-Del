import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
    return (
        <div className="sidebar text-xs md:text-[1vw] max-text- w-[35%] md:w-[18%] min-h-lvh border-[1.5px] border-solid border-[#a9a9a9] border-t-0" >
            <div className=" pt-12 pl-[20%] flex flex-col gap-5">
                <NavLink to="/add" className="flex items-center gap-3 border-solid border-[#a9a] border border-r-0 py-2 px-[10px] rounded-l cursor-pointer">
                    <img src={assets.add_icon} alt="add-icon" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="flex items-center gap-3 border-solid border-[#a9a] border border-r-0 py-2 px-[10px] rounded-l cursor-pointer">
                    <img src={assets.order_icon} alt="order-icon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/order" className="flex items-center gap-3 border-solid border-[#a9a] border border-r-0 py-2 px-[10px] rounded-l cursor-pointer">
                    <img src={assets.order_icon} alt="order-icon" />
                    <p>Orders Items</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar