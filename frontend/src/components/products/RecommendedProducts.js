import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
const RecommendedProducts = ({ category }) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const { products } = useSelector((state) => state.products)
    console.log('all products are:', products)
    console.log('category is', category)
    const categoryProducts = products.find((product) => product.category === category)
    console.log('products per caegory', categoryProducts)
    /* const fetchCategoryProducts = async () => {
        try {
            dispatchEvent(setIsLoading(true));
            const res = await axios.get(`${backUrl}/api/products/get-category-products`)
            console.log(

            )
        } catch (err) {
            console.log('Error fetching recommended products:', err.message)
        } finally {
            dispatchEvent(setIsLoading(false))
        }
    } */
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        </div>
    )
}

export default RecommendedProducts
