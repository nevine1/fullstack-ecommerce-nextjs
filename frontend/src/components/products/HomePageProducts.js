import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts } from '../../store/thunks/productsthunk';

const HomePageProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    const { products } = useSelector((state) => state.products);
    console.log('products are', products)

    const productList = Array.isArray(products) ? products : [];
    console.log('products are', productList)
    const categories = [...new Set(productList.map((p) => p.category))];
    console.log('homepageeeeeeeeeeee categories are:', categories)
    return (
        <div className="container mx-auto px-6 md:px-12 py-6 my-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Explore Our Collection</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* part 1 , categories with dynamic photos*/}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4 text-lg border-b pb-2">Categories</h2>
                    <div className="flex flex-col gap-3">
                        {categories?.slice(0, 4).map((category, index) => {

                            const categoryProduct = products.find(product => product.category === category);

                            return (
                                <Link
                                    key={index}
                                    href={`/categories/${category}`}
                                    className="flex items-center gap-3 group hover:bg-white p-2 rounded-md transition-all"
                                >
                                    <div className="w-10 h-10 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                        {categoryProduct?.images?.[0] && (
                                            <Image
                                                src={categoryProduct.images[0]}
                                                alt={category}
                                                fill
                                                className="object-contain p-1 group-hover:scale-110 transition-transform"
                                            />
                                        )}
                                    </div>
                                    <span className="text-gray-700 font-medium capitalize group-hover:text-blue-600">
                                        {category}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* part2: filtered category(mobiles , airpods) */}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4 text-lg border-b pb-2">Latest Audio</h2>
                    <div className="flex flex-col gap-4">
                        {productList
                            ?.filter(product => product.category.toLowerCase() === "airpods")
                            .slice(0, 3)
                            .map((product) => (
                                <div key={product._id} className="flex items-center gap-3">
                                    <div className="w-12 h-12 relative bg-white rounded border border-gray-100 flex-shrink-0">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <h3 className="text-sm font-medium line-clamp-2 text-gray-800">
                                        {product.name}
                                    </h3>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* part 3 , new arrival */}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4 text-lg border-b pb-2">New Arrivals</h2>
                    <div className="flex flex-col gap-2">
                        {productList?.slice(0, 5).map(product => (
                            <Link
                                href={`/product/${product._id}`}
                                key={product._id}
                                className="text-sm text-gray-600 hover:text-orange-600 truncate block border-l-2 border-transparent hover:border-orange-500 pl-2"
                            >
                                {product.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* part 4, offers  */}
                <div className="bg-blue-600 border border-blue-700 rounded-lg p-4 flex flex-col items-center justify-center text-center text-white">
                    <h2 className="font-bold text-xl mb-2">Member Deal</h2>
                    <p className="text-sm opacity-90 mb-4">Get free shipping on all orders over $50</p>
                    <button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition shadow-lg">
                        Learn More
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HomePageProducts;