import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setIsLoading } from '@/store/slices/productsSlice';
const RecommendedProducts = ({ category }) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const [catProducts, setCatProducts] = useState([])



    const fetchProductsPerCategory = async () => {

        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/products/get-products-for-category/${category}`)
            console.log('all products are:', res.data)
            if (res.data.success) {
                setCatProducts(res.data.data);
                console.log('prducts are', catProducts)
            }
        } catch (err) {
            console.log('Error fetching all products:', err.message)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        if (category) {
            fetchProductsPerCategory();
        }
    }, [category])
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
            {
                catProducts?.length > 0 ? (
                    catProducts?.map((product, index) => (
                        <div key={index}>{product.name}</div>
                    ))
                ) : (
                    <h1> There are no matched products</h1>
                )
            }
        </div>
    )
}

export default RecommendedProducts
