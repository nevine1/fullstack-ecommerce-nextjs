"use client";
import React from "react";
import LeftSide from "@/components/admin/LeftSide";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden"> 
      {/* sidebar - no scroll down*/}
      <div className="w-1/5 border-r border-gray-200 bg-gray-100 custom-shadow h-full overflow-hidden">
        <LeftSide />
      </div>

      {/* main content - scroll down */}
      <div className="flex-1 p-6 bg-gray-50 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default layout;
