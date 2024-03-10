import React, { useState, useEffect } from 'react';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

const Banner = () => {
  const data = [
    "https://thumbs.dreamstime.com/z/full-size-profile-photo-pretty-shopaholic-lady-good-mood-walk-shopping-mall-store-hold-many-bags-wear-green-cropped-full-size-190568906.jpg?ct=jpeg",
    "https://www.fabhotels.com/blog/wp-content/uploads/2018/10/1000X650-26.jpg",
    "https://static2.bigstockphoto.com/0/0/5/large1500/5004504.jpg",
    "https://innoviti.com/wp-content/uploads/2022/05/10-benefits-of-shopping-from-your-nearby-store.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const transitionEndHandler = () => {
      setTransitioning(false);
    };

    document.addEventListener('transitionend', transitionEndHandler);

    return () => {
      document.removeEventListener('transitionend', transitionEndHandler);
    };
  }, []);

  const prevSlide = () => {
    if (!isTransitioning) {
      setTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setTransitioning(true);
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="w-full h-auto overflow-x-hidden p-4">
      <div className="w-screen h-[650px] relative">
        <div className="w-full h-full flex" style={{ transition: 'opacity 1s ease', marginTop: '20px' }}>
          {data.map((image, index) => (
            <div
              key={index}
              className={`w-full h-full ${index === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
              style={{ padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <img
                className="w-full h-full object-cover rounded-md"
                src={image}
                alt={`Img${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-10 justify-center items-center">
          <div
            onClick={prevSlide}
            className="w-14 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white active:bg-gray-900 duration-300 cursor-pointer"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white active:bg-gray-900 duration-300 cursor-pointer"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
