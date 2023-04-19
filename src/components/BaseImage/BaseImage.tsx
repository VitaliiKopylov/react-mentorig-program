import { ImgHTMLAttributes } from 'react';

import fallbackSrc from '../../assets/images/no_poster.jpg';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const BaseImage = ({ src, ...props }: IImageProps) => (
  <img
    onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = fallbackSrc;
    }}
    src={src ? src : fallbackSrc}
    {...props}
  />
);

export default BaseImage;
