"use client";
import React from "react";
import LeftSide from "@/components/admin/LeftSide";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">

      <div className="w-1/5 border-r border-slate-300 bg-slate-200 custom-shadow h-full overflow-hidden">
        <LeftSide />
      </div>

      {/* main content  */}
      <div className="flex-1  bg-gray-50 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default layout;
