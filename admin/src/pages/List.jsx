import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const List = () => {
    const url = import.meta.env.VITE_API_URL;
    const [list, setList] = useState([])
    // fetch all
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error(response.message)
        }
    }
    // remove click
    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
        await fetchList()
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='list add flex gap-3 flex-col p-10 w-3/4'>
            <p>All Food List</p>
            <div className="list-table">
                <div className="title list-table-format  grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-[#cacaca] text-[13px] bg-[#f9f9f9]">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-[#cacaca] text-[13px]">
                            <img className='w-12' src={`${url}/images/` + item.image} alt="food" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p className='cursor-pointer' onClick={() => removeFood(item._id)}>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List