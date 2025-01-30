import React from 'react';
import imagesCarousel from '../constants/imagesCarousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <>
          <div className="w-full mx-auto border border-1 rounded-xl">
      <Slider {...settings}>
        {imagesCarousel.map((product) => (
          <div key={product.id} className="outline-none">
            <div className="flex flex-col gap-10 md:flex-row items-center justify-between p-4 md:p-8">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                <h3 className="font-robo text-2xl md:text-4xl text-center text-gray-800">
                  {product.title}
                </h3>
                <p className='font-robo text-xl md:text-base text-center text-gray-800 pt-5'>{product.description.split(" ").slice(0, 25).join(" ")}{product.description.split(" ").length > 25 ? "..." : ""}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
};

export default Hero;
