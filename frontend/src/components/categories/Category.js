"use client"
import { useParams } from "next/navigation"
const Category = () => {
  const category = useParams();
    return (
      
    <div>
      <h1>Category name is {category} </h1>
      
    </div>
  )
}

export default Category
