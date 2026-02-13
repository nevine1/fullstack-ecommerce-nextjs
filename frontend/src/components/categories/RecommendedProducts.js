import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ProductCart from '@/components/products/ProductCard'

const RecommendedProducts = ({ category, currentProductId }) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const [catProducts, setCatProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const finalCatProducts = catProducts.filter((pro) => pro._id !== currentProductId)

    const fetchProductsPerCategory = async () => {

        try {
            setLoading(true)
            const res = await axios.get(`${backUrl}/api/products/get-products-for-category/${category}`)
            console.log('all products are:', res.data)
            if (res.data.success) {
                setCatProducts(res.data.data);
            }
        } catch (err) {
            console.log('Error fetching all products:', err.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {

        if (category) {
            fetchProductsPerCategory();
        }

    }, [category])

    return (
        <div className="container mx-auto items-center px-10 py-6 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Recommended Products</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {
                    finalCatProducts?.length > 0 ? (
                        finalCatProducts?.map((product) => (
                            <div key={product._id} >
                                <ProductCart product={product} />
                            </div>

                        ))
                    ) : (
                        <h1> There are no matched products</h1>
                    )
                }
            </div>

        </div>
    )
}

export default RecommendedProducts
