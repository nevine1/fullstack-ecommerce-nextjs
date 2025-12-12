"use client"
import { useParams } from "next/navigation"

const page = () =>{

    const {catName} = useParams();
    return(
        <div>
           {/*  <Category/> */}
           <h1>category name is {catName}</h1>
        </div>
    )
}

export default page; 