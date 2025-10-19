import React from 'react'
import data_product from '../../assets/data'
import Item from '../shop/Item'
const Popular = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-[90vh]">
          <h1 className="text-gray-700 font-semibold text-[40px]">Popular in Woman</h1>
          <hr className="w-[200px] h-[6px] border-lg text-gray-500"/>
          <div className="poplar_item">
              {
                  data_product.map((product, index) => (
                    <div key={index}>
                      <Item product={product}  />
                     </div> 
                  ))
              }
          </div>
    </div>
  )
}

export default Popular
