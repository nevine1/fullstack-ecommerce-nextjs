
"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import profileImage from '../../assets/profile.png'
import Image  from 'next/image'
import Link from 'next/link'
const CategoryProducts = () => {

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const [catProducts, setCatProducts] = useState([])
  
      const fetchCatProducts = async () => {
          try {
            const res = await axios.get(`${backUrl}/api/products/get-category-products`);
            console.log('res is the', res.data)
            if (res.data.success) {
              
              setCatProducts(res.data.data); 
            }
          } catch (err) {
              console.log('Error is:', err.message)
          }
      }
  console.log('category is', catProducts)
  
  useEffect(() => {
   
      fetchCatProducts();
   
  }, [])

  
return ( 
       <div className="scrollbar-none flex  items-center justify-center sm:overflow-hidden  gap-8 m-4 p-6 bg-white">
          {
            catProducts.length > 0 ? catProducts.map((category, index) => (
              <div key={index}>
                {
                  category.products.slice(0, 1).map((product, index) =>(
                    <Link href={`/categories/${product.category}`} key={index} className="flex items-center flex-col cursor-pointer gap-2">
                      <div  className="md:h-16 md:w-16 sm:h-16 sm:w-16  ">
                        <Image
                          src={product?.images[2]}
                          alt={product.name}
                          height={100}
                          width={100}
                          className="h-full w-full transition-all duration-300 hover:scale-105 object-fill bg-gray-200 p-2 mix-blend-multiply rounded-full"
                        />
                      </div>
                      <p className="text-[12px] capitalize">{product?.name.slice(0, 6)}</p>
                    </Link>
                    
                  ))
                }
              </div>
            )): (
              <h1>This category has no products</h1>
            )
          }
      </div> 
    )
  }

export default CategoryProducts
