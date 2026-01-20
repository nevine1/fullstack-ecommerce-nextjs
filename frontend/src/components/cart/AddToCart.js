import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
const AddToCart = () => {
    const [cartItems, setCartItems] = useState([])
    const { userToken } = useSelector((state) => state.user)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleAddToCart = async (productId, userId) => {
        try {
            const res = await axios.post(`${backUrl}/api/cart/add-to-cart`, { productId }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            if (res.data.success) {
                setCartItems(res.data.data)
            }
            console.log(response.data)
        } catch (error) {
            console.error("Error adding to cart:", error)
        }
    }
    return (
        <div>AddToCart</div>
    )
}

export default AddToCart