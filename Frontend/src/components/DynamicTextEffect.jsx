import React, { useState, useEffect } from "react";

const DynamicTextEffect = () => {
  const words = ["Chemicals", "Parabens", "Petrochemicals"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // 500ms for the transition time
    }, 3000); // Word changes every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <>
      <div className=" mt-10 mb-10 py-6 w-full min-h-[200px] rounded-3xl overflow-hidden text-center flex flex-col justify-center items-center px-10">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-3xl md:text-5xl font-extrabold text-balck font-robo">
            Free from
          </div>
          <div className="text-3xl font-robo md:text-5xl font-extrabold text-red-700 overflow-hidden leading-loose min-h-24">
            <div
              className={`inline-block transition-transform duration-500 ease-in-out ${
                isAnimating ? "-translate-y-full" : "translate-y-0"
              }`}
            >
              {words[currentWordIndex]}
            </div>
          </div>
        </div>
              <p className="sm:text-sm md:text-base font-robo italic">We take care of your skin in a safer and cleaner way with our chemical free, paraben free and petrochemical free products. This is our way of ensuring that you are free to enjoy using products that are as pure as the earth’s elements while caressing your skin.</p>
      </div>
    </>
  );
};

export default DynamicTextEffect;
