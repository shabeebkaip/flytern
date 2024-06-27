import Image from 'next/image';
import React, { useState } from 'react';

const ImageComponent = ({ imageUrl, defaultImageUrl }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const handleError = () => {
    setCurrentImageUrl(defaultImageUrl);
  };
  return (
    <Image
      src={currentImageUrl}
      width={1000}
      height={1000}
      onError={handleError}
      className={`${currentImageUrl === defaultImageUrl ? 'object-contain' : 'object-fit' }  w-full rounded-md lg:h-40 `}
      alt=""
    />
  );
};

export default ImageComponent;