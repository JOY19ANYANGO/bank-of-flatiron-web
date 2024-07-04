import React, { useState, useEffect } from "react";

function Slideshow({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="max-w-md mx-auto mb-4 rounded-md overflow-hidden shadow-lg">
      <img src={images[index]} alt={`Slide ${index + 1}`} className="w-full" />
    </div>
  );
}

export default Slideshow;
