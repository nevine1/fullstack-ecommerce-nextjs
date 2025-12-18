import React from 'react'
import Image from 'next/image'
const HorizontalProuctCart = () => {
    return (
        <div className="container mx-auto px-4 my-6 ">
            <div className="flex h-39 w-full min-w-[200px] md:min-w-[320px] bg-white shadow-md rounded-md ">
                <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px]">
                    <Image
                        src="/"
                        alt="product image"
                    />
                </div>
            </div>
        </div>
    )
}

export default HorizontalProuctCart
