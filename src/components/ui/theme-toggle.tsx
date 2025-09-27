'use client';

import { Button } from '@/components/ui/button';
import { Theme, THEME_CONFIGS } from '@/constants/themes';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';
import { useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme, themeConfig } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="gap-2"
            >
                <Palette className="h-4 w-4" />
                {themeConfig.name}
            </Button>

            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 主題選單 */}
                    <div className="absolute right-0 top-full mt-2 w-64 z-20">
                        <div
                            className={`${themeConfig.noteItem.note.background} border ${themeConfig.noteItem.note.border} rounded-lg shadow-lg p-2`}
                        >
                            <div
                                className={`text-sm font-medium mb-2 ${themeConfig.noteItem.note.text} opacity-80`}
                            >
                                選擇主題風格
                            </div>

                            <div className="space-y-1">
                                {Object.entries(THEME_CONFIGS).map(([themeKey, config]) => (
                                    <button
                                        key={themeKey}
                                        onClick={() => handleThemeChange(themeKey as Theme)}
                                        className={`w-full text-left p-3 rounded-md transition-colors ${theme === themeKey
                                                ? `${themeConfig.button.primary} text-white`
                                                : `${themeConfig.noteItem.note.hover} ${themeConfig.noteItem.note.text}`
                                            }`}
                                    >
                                        <div className="font-medium">{config.name}</div>
                                        <div
                                            className={`text-xs mt-1 ${theme === themeKey ? 'text-white/80' : 'opacity-70'
                                                }`}
                                        >
                                            {config.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
