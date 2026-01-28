import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  priority?: boolean;
}

// Since we are in a React SPA environment and not Next.js, we mock the next/image behavior
// with a standard img tag optimized for Tailwind.
export const Image: React.FC<ImageProps> = ({ src, alt, width, height, className, priority, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`block max-w-full h-auto ${className}`}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
};