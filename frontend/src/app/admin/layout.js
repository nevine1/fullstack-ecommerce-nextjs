"use client";
import React, { useState } from "react";
import LeftSide from "@/components/admin/LeftSide";


const layout = ({children}) => {
  

  return (
    <div className="flex min-h-screen h-screen">
      {/* Sidebar */}
      <div className="w-1/5 border-r border-gray-200 bg-gray-100 custom-shadow">
        <LeftSide />
      </div>

      {/* Main content  */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default layout;
