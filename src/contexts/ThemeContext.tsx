'use client';

import { STORAGE_KEYS } from '@/constants';
import { getThemeConfig, Theme, ThemeConfig } from '@/constants/themes';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface ThemeContextType {
    theme: Theme;
    themeConfig: ThemeConfig;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(Theme.MINIMAL);

    // 從 localStorage 載入主題設定
    useEffect(() => {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
        if (savedTheme && Object.values(Theme).includes(savedTheme)) {
            setThemeState(savedTheme);
        }
    }, []);

    // 儲存主題設定到 localStorage
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    };

    const themeConfig = getThemeConfig(theme);

    return (
        <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
