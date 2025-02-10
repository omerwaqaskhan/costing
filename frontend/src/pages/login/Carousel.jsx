import React, { useState, useEffect } from 'react';
import './styles.css';

const images = [
    '/login/car-1.svg',
    '/login/car-2.svg',
    '/login/car-3.svg',
    '/login/car-4.svg',
    '/login/car-5.svg',
    '/login/car-6.svg',
    '/login/car-7.svg',
    '/login/car-8.svg',
    '/login/car-9.svg'
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        if (currentIndex === index) {
            setCurrentIndex(-1); // Reset index to force animation restart
            setTimeout(() => setCurrentIndex(index), 10); // Reapply after a short delay
        } else {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="w-full flex flex-col items-center h-[470px] relative">
            <img src={images[currentIndex]} alt="Carousel" className='carousel' />
            <div className="flex mt-4">
                {images.map((_, index) => (
                    <div 
                        key={index + '-' + currentIndex} // Unique key ensures re-render
                        className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
