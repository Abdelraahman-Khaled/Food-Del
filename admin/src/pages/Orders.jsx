import { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from '../assets/admin_assets/assets'
const Orders = ({ url }) => {
    const [orders, setOrders] = useState([])
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list")
        if (response.data.success) {
            setOrders(response.data.data)
            console.log(response.data.data);
        } else {
            toast.error("Error")
        }
    }
    const statusHandler = async (e, orderId) => {
        const response = await axios.post(url + "/api/order/status", { status: e.target.value, orderId })
        if (response.data.success) {
            await fetchAllOrders()
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])
    return (
        <div className='order add m-14'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item text-xs grid-cols-[0.5fr_2fr_1fr] py-4 px-2 grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-7 border border-solid border-[tomato] md:p-5 my-7 mx-0 md:text-sm text-[#505050]">
                        <img className='w-10 md:w-auto' src={assets.parcel_icon} alt="parcel_icon" />
                        <div>
                            <p className='order-item-food font-semibold'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className='order-item-name font-semibold mt-8 mb-1'>
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div className='order-item-addresss mb-2'>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='bg-[#ffe8e4] border border-solid border-[tomato] w-max-[(10vw,120px)] md:py-2 outline-none p-[5px] text-xs md:text-base'>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders