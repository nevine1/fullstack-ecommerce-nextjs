"use client";
import React, { useState } from "react";
import LeftSide from "./LeftSide";


const AdminLayout = ({children}) => {
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200">
        <LeftSide />
      </div>

      {/* Main content (changes based on route) */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
