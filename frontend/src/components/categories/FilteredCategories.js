"use client"

import { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllProducts } from "@/store/thunks/productsthunk"
import { addToCart } from "@/store/thunks/cartThunk"
import Image from "next/image"
import Link from "next/link"
const FilteredCategories = () => {
    const dispatch = useDispatch()
    const { products = [] } = useSelector((state) => state.products)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortOrder, setSortOrder] = useState("")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])


    const categories = useMemo(() => {
        return [...new Set(products.map((product) => product.category))]
    }, [products])

    // category checkbox
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        )
    }


    const handleSortChange = (value) => {
        setSortOrder(value)
    }

    // Filter + Sort logic
    const filteredProducts = useMemo(() => {
        let updatedProducts = [...products]

        // Filter
        if (selectedCategories.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                selectedCategories.includes(product.category)
            )
        }

        // Sort
        if (sortOrder === "lowToHigh") {
            updatedProducts.sort((a, b) => a.price - b.price)
        } else if (sortOrder === "highToLow") {
            updatedProducts.sort((a, b) => b.price - a.price)
        }

        return updatedProducts
    }, [products, selectedCategories, sortOrder])

    // Add to cart
    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId))
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

            {/* show filter button with mobile size */}
            <button
                className="md:hidden mb-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="flex flex-col md:flex-row gap-8">

                {/* left side */}
                <div
                    className={`${showFilters ? "block" : "hidden"
                        } md:block w-full md:w-64 bg-slate-100 p-6 rounded-lg shadow-sm`}
                >
                    <h2 className="text-lg font-semibold mb-4">Sort by:</h2>

                    {/* sorting type */}
                    <div className="mb-6 ">
                        <p className="font-medium mb-2">Sort by price</p>

                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="radio"
                                name="sort"
                                onChange={() => handleSortChange("lowToHigh")}
                            />
                            <span className="text-gray-700 text-sm">Price: Low to High</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sort"
                                onChange={() => handleSortChange("highToLow")}
                            />
                            <span className="text-gray-700 text-sm">Price: High to Low</span>
                        </div>
                    </div>

                    {/* all categories */}
                    <div>
                        <p className="font-bold mb-2">Categories</p>

                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                <label className="text-gray-700 text-sm">{category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* right side */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredProducts.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">
                            No products found
                        </p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col border border-slate-300"
                            >

                                <div className="relative w-full h-40 mb-4">
                                    <Link href={`/categories/${product.category}/${product._id}`}>

                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain mix-blend-multiply"
                                        />
                                    </Link>
                                </div>


                                <h3 className="font-medium text-sm mb-1 line-clamp-2">
                                    {product.name}
                                </h3>

                                <p className="text-xs text-gray-500 mb-2">
                                    {product.category}
                                </p>

                                <p className=" flex flex-row gap-4 mb-4 text-orange-500">
                                    <span>${product.price}</span>
                                    <span className="line-through text-gray-500 text-sm">${product.sellingPrice}</span>
                                </p>


                                <button
                                    className="mt-auto bg-orange-500 hover:bg-white hover:text-orange-500 border hover:border-orange-500 active:scale-95 text-white text-sm py-2 rounded-lg transition duration-200"
                                    onClick={() => handleAddToCart(product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    )
}

export default FilteredCategories