import React from "react";
import { Login, Register } from "../Components/index";

import SchoolSlider from "./SchoolSlider";
import { Outlet } from "react-router-dom";

function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-6xl w-full flex flex-col  md:flex-row items-stretch gap-8">
        {/* Left Side Image */}
        <SchoolSlider/>
        {/* Right Side Login */}
        <div className="w-full md:w-1/2 flex p-4">
          <div className="w-full bg-white rounded-xl shadow-lg p-8 flex items-center">
           <Login/>
          </div>
        </div>
      </div>
 
    </div>
  );
}

export default Home;
