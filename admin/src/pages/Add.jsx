import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
    const url = import.meta.env.VITE_API_URL;
    // Upload image
    const [image, setImage] = useState(false)
    // Store Data
    const [data, setData] = useState({
        name: '',
        description: '',
        price: "",
        category: "Salad"
    })
    // Handle function for Data
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    // checking the data
    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    // Api submit Handler
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", parseInt(data.price, 10)); // Ensure `price` is a number
            formData.append("category", data.category);
            formData.append("image", image); // Ensure `image` is a valid file object

            // Call API
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                // Reset form data
                setData({
                    name: '',
                    description: '',
                    price: "",
                    category: "Salad"
                });
                setImage(false);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error submitting the form:", error.message);
        }
    };

    return (
        <div className='add w-[70%] ml-6 md:ml-[5vw] mt-12 text-[#6d6d6d] text-base'>
            <form className='gap-5 flex flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col flex gap-3">
                    <p>Upload Image</p>
                    <label className='w-32 ' htmlFor="image">
                        <img className='cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name max-w-72 md:w-max-[40%] flex-col flex gap-3">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} className='p-3 border outline-none focus:border-[tomato]' type="text" name='name' placeholder='Type Here...' />
                </div>
                <div className="add-product-description max-w-72 md:w-max-[40%] flex-col flex gap-3">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} className='p-3 border outline-none focus:border-[tomato] ' name='description' rows={6} placeholder='Write Content Here...' required />
                </div>
                <div className="add-category-price flex gap-7">
                    <div className="add-category flex-col flex gap-3">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} className='min-w-32 p-3 border outline-none cursor-pointer' name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col flex gap-3">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} className='max-w-32 p-3 border outline-none focus:border-[tomato]' type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button className='add-button max-w-32 border-none p-3 bg-black text-white cursor-pointer' type='submit' >Add</button>

            </form>
        </div>
    )
}

export default Add