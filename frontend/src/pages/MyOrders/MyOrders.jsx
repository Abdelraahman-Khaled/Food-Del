import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { assets } from "../../assets/frontend_assets/assets"
import { StoreContext } from "../../context/StoreContext"

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])
    return (
        <div className="my-orders my-12">
            <h2>My Orders</h2>
            <div className="container flex flex-col gap-5 mt-7">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order grid grid-cols-[1fr_2fr_1fr] gap-1 text-xs md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center md:gap-7 md:text-sm py-3 px-5 text-[#454545] border border-solid border-[tomato]">
                            <img className="w-12" src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p className="text-center">${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span className="text-[tomato]">&#x25cf;</span> <b className="text-[#454545] font-medium">{order.status}</b></p>
                            <button onClick={fetchOrders} className="border-none text-[10px] md:text-base py-3 px-0 bg-[#ffe1e1] cursor-pointer text-[#454545]">Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders