import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts } from '../../store/thunks/productsthunk';
import { setSearchedCategory } from '@/store/slices/productsSlice';
const HomePageProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])
    const [selectedCategory, setSelectedCategory] = useState("Camera")
    const { products, lastSearchedCategory } = useSelector((state) => state.products);

    const selectedCategoryProducts = products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());


    const productList = Array.isArray(products) ? products : [];
    console.log('products are', productList)
    const categories = [...new Set(productList.map((p) => p.category))];

    //related products to the searched proucts' category; 
    const relatedSearchedProducts = productList.filter(
        (product) =>
            product.category?.toLowerCase() ===
            lastSearchedCategory?.toLowerCase()
    );
    return (
        <div className="container mx-auto px-6 md:px-12 py-10 my-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Explore Our Collection</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* part 1 , categories with dynamic photos*/}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4 text-lg border-b pb-2 text-orange-600">Categories</h2>
                    <div className=" gap-4 grid grid-cols-2">
                        {categories?.slice(0, 4).map((category, index) => {

                            const categoryProduct = products.find(product => product.category === category);

                            return (
                                <div
                                    key={index}

                                    className="flex flex-col items-center gap-1 group hover:bg-white p-2 rounded-md duration-300 transition-all cursor-pointer"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <div className="w-24 h-24 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                        {categoryProduct?.images?.[0] && (
                                            <Image
                                                src={categoryProduct.images[0]}
                                                alt={category}
                                                fill
                                                className="object-contain p-1 mix-blend-multiply group-hover:scale-110 transition-transform"
                                            />
                                        )}
                                    </div>
                                    <span className="text-gray-700 font-medium capitalize group-hover:text-blue-600">
                                        {category}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 font-medium"> Discover more </button>
                </div>

                {/* part2: filtered category's proucts' */}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold text-orange-600 mb-4 text-lg border-b pb-2">Categories&apos; Products</h2>
                    <div className=" gap-4 grid grid-cols-2">

                        {
                            selectedCategoryProducts.slice(0, 4).map((product) => (

                                <Link key={product._id} className="flex flex-col items-center "
                                    href={`/products/${product._id}`}>
                                    <div className=" w-20 h-20 relative bg-white rounded border border-gray-100 flex-shrink-0">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-sm font-medium line-clamp-2 text-gray-800">
                                        {product.name.slice(0, 10)}
                                    </h3>
                                </Link>
                            )
                            )
                        }
                    </div>
                </div>

                {/* part 3 , new arrival */}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4 text-lg text-orange-600 border-b pb-2">New Arrivals</h2>
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
                <div className="bg-slate-100 border border-slate-200 rounded-lg gap-8 flex flex-col items-center justify-center text-center text-orange-600">
                    <h2 className="font-bold text-xl mb-2">Member Deal</h2>
                    <p className="text-md  mb-4">Get free shipping on all orders over $700</p>
                    {/* <button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition shadow-lg">
                        Learn More
                    </button> */}
                </div>

            </div>
            { /* related searched products */}
            {lastSearchedCategory && (
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">
                        Related to Your Search
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedSearchedProducts.slice(0, 4).map((product) => (
                            <div key={product._id} className="border p-3 rounded">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                />
                                <p className="text-sm mt-2">{product.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomePageProducts;