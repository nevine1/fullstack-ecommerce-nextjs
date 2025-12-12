"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation"
import axios from "axios";
const page = () =>{

    const {catName} = useParams();
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const fetchProductsPerCategory = async() =>{
        try{
            const res  = await axios.get(`${backUrl}/api/products/get-products-for-category/${catName}`);
            console.log("res is",res.data)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() =>{
        fetchProductsPerCategory();
    }, [])
    return(
        <div>
           {/*  <Category/> */}
           <h1>category name is {catName}</h1>
        </div>
    )
}

export default page; 