'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export function Header() {
  const { themeConfig } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 border-b ${themeConfig.noteItem.note.background} backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className={`font-bold text-gray-800`}>
              Bullet Note v2
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
