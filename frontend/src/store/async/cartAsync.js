import axios from 'axios'
import { setIsCartLoading, setCartItems } from '../slices/cartSlice'
import { useRouter } from 'next/navigation'


const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const handleAddToCart = async (dispatch, userToken, router) => {
    try {
        dispatch(setIsCartLoading(true))

        const res = await axios.post(
            `${backUrl}/api/cart/add-to-cart`,
            { productId },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        )

        if (res.data.success) {
            dispatch(setCartItems(res.data.data))

            router.push('/cart')
        }
    } catch (error) {
        console.error("Error adding to cart:", error)
    } finally {
        dispatch(setIsCartLoading(false))
    }
}