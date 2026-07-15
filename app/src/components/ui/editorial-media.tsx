import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from 'react';

import type { EditorialIllustration } from '@/lib/editorialIllustrations';
import { cn } from '@/lib/utils';

export interface EditorialMediaProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  readonly asset: EditorialIllustration;
  readonly decorative?: boolean;
  readonly priority?: boolean;
  readonly frameClassName?: string;
  readonly imageClassName?: string;
}

export function EditorialMedia({
  asset,
  decorative = false,
  priority = false,
  frameClassName,
  imageClassName,
  className,
  onError,
  ...imageProps
}: EditorialMediaProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [asset.src]);

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    onError?.(event);
    setFailed(true);
  };

  const hasAccessibleFallback = failed && !decorative;

  return (
    <div
      data-slot="editorial-media"
      role={hasAccessibleFallback ? 'img' : undefined}
      aria-label={hasAccessibleFallback ? asset.alt : undefined}
      className={cn(
        'w-full overflow-hidden rounded-none border border-border bg-[#24211F]',
        asset.aspectClass,
        frameClassName,
      )}
    >
      {!failed && (
        <img
          {...imageProps}
          src={asset.src}
          alt={decorative ? '' : asset.alt}
          sizes={asset.sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={cn(
            'h-full w-full object-cover',
            asset.objectPositionClass,
            className,
            imageClassName,
          )}
          onError={handleError}
        />
      )}
    </div>
  );
}
