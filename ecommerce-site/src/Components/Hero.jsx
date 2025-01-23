import React from "react";
import hero from "../assets/frontend_assets/hero_img.png";
import { img } from "./img";
import Latest_Collection from "./Latest_Collection";
import BestSeller from "./BestSeller";
// import { assets } from "../frontend_assets/assets";
// import assets from "../assets/frontend_assets/assets";


const Hero = () => (
  <>

  <section className="h-full w-full flex items-center justify-center">
    <div className="border-2 border-gray-300 mt-2 h-[500px] w-[80%] grid grid-cols-2 place-items-center">
      <div className="flex flex-col gap-y-3 font-prata ">
        <div className="flex items-center">
          <span className="inline-block w-10 h-1 bg-black"></span>
          <h1 className="ml-1 text-xl">OUR BESTSELLERS</h1>
        </div>
        <h1 className="font-semibold text-5xl">Latest Arrivals</h1>
        <div className="flex items-center">
          <h1 className="text-3xl">Shop Now</h1>
          <span className="inline-block w-10 h-1 bg-black ml-1"></span>
        </div>
      </div>
      <img src={img.hero_img} className="h-full" alt="Hero" />
    </div>
  </section>

  {/* section 2 */}
  

  <Latest_Collection/>
  {/* <BestSeller/> */}
  
  </>

  
);

export default Hero;
