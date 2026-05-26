import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

// Static cache to store fetched SVG strings to prevent repeated network requests
const svgCache: Record<string, string> = {};

interface CustomIconProps {
  name: string;
  type?: 'solid' | 'regular' | 'brands';
  className?: string;
}

export function CustomIcon({ name, type = 'solid', className }: CustomIconProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  
  useEffect(() => {
    const cacheKey = `${type}/${name}`;
    if (svgCache[cacheKey]) {
      setSvgContent(svgCache[cacheKey]);
      return;
    }

    let isMounted = true;
    fetch(`/svgs-icons/${type}/${name}.svg`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Icon "${name}" not found in folder "${type}"`);
        }
        return res.text();
      })
      .then((text) => {
        // Clean up XML header, doctype, and comments to allow clean inline injection
        const cleanSvg = text
          .replace(/<\?xml.*?\?>/i, '')
          .replace(/<!DOCTYPE.*?>/gi, '')
          .replace(/<!--.*?-->/gs, '')
          .trim();
        
        svgCache[cacheKey] = cleanSvg;
        if (isMounted) {
          setSvgContent(cleanSvg);
        }
      })
      .catch((err) => {
        console.warn(err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [name, type]);

  if (!svgContent) {
    // Return a matching layout container to prevent layout shifting
    return (
      <span
        className={cn("inline-block size-4 shrink-0 bg-transparent", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center size-4 shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current [&>svg]:stroke-none",
        className
      )}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
