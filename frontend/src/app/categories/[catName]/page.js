"use client"
import { useEffect  , useState } from "react";
import { useParams } from "next/navigation"
import axios from "axios";
import Image from "next/image";
const page = () =>{

    const {catName} = useParams();
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [catProducts, setCatProducts] = useState([])

    const fetchProductsPerCategory = async() =>{
        try{
            const res  = await axios.get(`${backUrl}/api/products/get-products-for-category/${catName}`);
            console.log("res is",res.data)
            setCatProducts(res.data.data)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() =>{
        fetchProductsPerCategory();
    }, [])

    return(
        <div className="m-6 ">
           {/*  <Category/> */}
           <h1>All porducts in <span className="font-bold text-red-500 pl-2 text-[18px]">{catName}</span></h1>
           <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {
                catProducts.length > 0 ? (
                    catProducts.map((product, index) => (
                        <div key={index}
                            className=" flex flex-col gap-8 items-center m-4 bg-slate-200 p-4 rounded-md shadow-md border border-gray-300">
                            <h1>{product.name.slice(0, 25)}</h1>
                            <Image
                                src={product?.images[1]}
                                alt="product Image"
                                height={100}
                                width={100}
                                className="h-32 w-32 object-cover rounded-md"
                            />
                        </div>
                    ))
                ): (
                    <div>
                        <h1>{catName} has no products</h1>
                        </div>
                )
            }
           </div>
        </div>
    )
}

export default page; 