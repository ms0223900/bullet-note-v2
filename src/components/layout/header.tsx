'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, Plus, Search, Settings } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { themeConfig } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${themeConfig.noteItem.note.background} backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className={`font-bold ${themeConfig.noteItem.note.text}`}>
              Bullet Note v2
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="ghost" size="sm" className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              搜尋筆記...
            </Button>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
