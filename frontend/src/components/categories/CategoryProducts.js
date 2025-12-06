import { useEffect, useState } from 'react'
import { useParams} from 'next/navigation'
import axios from 'axios'
const CategoryProducts = () => {
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
   const {cat} = useParams();
      const [catProducts, setCatProducts ] = useState([])
      const fetchCatProducts = async ()=>{
          try {
            const res = await axios.get(`${backUrl}/api/products/get-category-products/${cat}`);
            if (res.data.success) {
              setCatProducts(res.data.data); 
            }
          } catch (err) {
              console.log('Error is:', err.message)
          }
      }
  console.log('category is', cat)
  
  useEffect(() => {
    if (cat) {
      fetchCatProducts();
    }
  }, [cat])

  
      return (
        
      <div>
          <h1>Hello category page</h1>
          {
            catProducts.length > 0 ? catProducts.map((product, index) => (
              <div key={index}>
                <h1>{product.name}</h1>
              </div>
            )): (
              <h1>This category has no products</h1>
            )
          }
      </div>
    )
  }

export default CategoryProducts
