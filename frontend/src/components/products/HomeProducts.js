import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts } from "@/store/async/productsAsync"

import axios from 'axios'
const HomeProducts = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);


    useEffect(() => {
        fetchAllProducts(dispatch);
    }, [])
    console.log('all prdocuta sare products', products)
    return (
        <div>
            {
                products.length > 0 && products.map((product, index) => (
                    <div key={index}>
                        <h2>{product.name}</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default HomeProducts
