import React, { useEffect, useState } from "react";
import { IMAGE_API } from "./constants";
import axios from "axios";

export const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    axios.get(IMAGE_API)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Image Slider</h1>
        <p className="text-lg text-white">Click "Next" or "Previous" to navigate through the images, or wait for the automatic slideshow.</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 font-bold py-2 px-4 rounded shadow-lg"
          onClick={handlePreviousClick}
        >
          Previous
        </button>
        {images.length > 0 && (
          <div className="w-96 h-96 flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
            <img src={images[currentIndex].image} className="max-w-full max-h-full object-contain" alt="Loaded" />
          </div>
        )}
        <button
          className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 font-bold py-2 px-4 rounded shadow-lg"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};
