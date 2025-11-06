"use client"
import React from 'react'
import LeftSide from './LeftSide'

const Admin = () => {
  
  return (
    <div className="flex flex-row  h-[100vh] bg-pink-200">
      <div className=" min-h-full bg-blue-200 w-full max-w-80">
        <LeftSide/>
      </div>
      <main>main</main>
    </div>
  )
}

export default Admin;
 