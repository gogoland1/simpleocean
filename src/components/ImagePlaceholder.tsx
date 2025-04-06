import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImagePlaceholderProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

/**
 * Componente de imagen con manejo de fallback
 * Cuando la imagen principal no carga, muestra una imagen de respaldo
 */
export default function ImagePlaceholder({
  src,
  fallbackSrc = '/images/placeholder.png',
  alt,
  ...props
}: ImagePlaceholderProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Maneja el error de carga de imagen
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || ''}
      onError={handleError}
    />
  );
}