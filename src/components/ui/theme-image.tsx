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
        'absolute w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none',
        getPositionClasses(),
        className
      )}
    >
      {/* 預留圖片位置，目前使用佔位符 */}
      <div className="w-full h-full bg-current rounded-lg flex items-center justify-center">
        <span className="text-xs font-medium opacity-50">
          {themeConfig.name}
        </span>
      </div>

      {/* 當有實際圖片時，取消註解以下代碼 */}
      {/* 
      <img
        src={themeConfig.image.src}
        alt={themeConfig.image.alt}
        className="w-full h-full object-cover rounded-lg"
      />
      */}
    </div>
  );
}
