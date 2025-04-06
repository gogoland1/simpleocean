import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
};

/**
 * Componente de imagen con manejo automático de fallback
 */
export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/placeholder.png",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}