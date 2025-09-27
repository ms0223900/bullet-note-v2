'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeImageProps {
  className?: string;
}

export function ThemeImage({ className }: ThemeImageProps) {
  const { themeConfig } = useTheme();

  if (!themeConfig.image) {
    return null;
  }

  const getPositionClasses = () => {
    switch (themeConfig.image?.position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div
      className={cn(
        'absolute z-0 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 pointer-events-none',
        getPositionClasses(),
        className
      )}
    >
      <img
        src={themeConfig.image.src}
        alt={themeConfig.image.alt}
        className="w-full h-full object-cover rounded-lg"
      />

    </div>
  );
}
