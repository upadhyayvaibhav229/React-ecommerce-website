import React from "react";
import { img } from "../Components/img";
import Title from "../Components/Title";
const Contact = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-y-10">

  <div className="flex flex-col items-center mt-10 w-full">
    <Title text1={"Contact"} text2={"Us"} />
  </div>


  <div className="flex justify-center items-center mt-5 gap-x-5">
  <div>

    <img src={img.contact_img} className="h-[450px]" alt="Contact Us" />
  </div>
  <div className="ml-5 w-1/6 space-y-6">
    <h1 className="font-bold text-gray-600 text-xl">Our Store</h1>
    <p className="text-gray-500 text-md">54709 Willms Station <br />
    Suite 350, Washington, USA</p>
    <p className="text-gray-500 text-md">
    Tel: (415) 555-0132
    <br />
    Email: admin@forever.com
    </p>

    <h1 className="font-bold text-gray-600 text-xl">Careers at Forever</h1>

    <p className="text-gray-500 text-md">
      Learn more about our teams and job openings.
    </p>

    <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
  </div>
  </div>

    {/* <!-- Subscription Section --> */}
    <div className="text-center mt-10">
          <p className="text-2xl font-medium text-gray-800">
            Subscribe now &amp; get 20% off
          </p>
          <p className="text-gray-500 mt-3 font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input
              className="w-full sm:flex-1 outline-none py-2 placeholder:text-gray-500"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition placeholder:font-bold"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
</div>

  );
};

export default Contact;
