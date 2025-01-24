import React from "react";
import hero from "../assets/frontend_assets/hero_img.png";
import { img } from "./img";
import Latest_Collection from "./Latest_Collection";
import BestSeller from "./BestSeller";

const Hero = () => (
  <>
    {/* Hero Section */}
    <section className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="border-2 border-gray-300 mt-2 h-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
        {/* Text Section */}
        <div className="flex flex-col gap-y-3 font-prata text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <span className="inline-block w-10 h-1 bg-black"></span>
            <h1 className="ml-1 text-xl">OUR BESTSELLERS</h1>
          </div>
          <h1 className="font-semibold text-4xl md:text-5xl">Latest Arrivals</h1>
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-2xl md:text-3xl">Shop Now</h1>
            <span className="inline-block w-10 h-1 bg-black ml-1"></span>
          </div>
        </div>

        {/* Image Section */}
        <img
          src={img.hero_img || hero} // Fallback to the `hero` image if `img.hero_img` is not available
          className="h-auto w-full max-h-[400px] object-cover"
          alt="Hero"
        />
      </div>
    </section>

    {/* Latest Collection Section */}
    <Latest_Collection />

    {/* BestSeller Section */}
    <BestSeller />
  </>
);

export default Hero;
