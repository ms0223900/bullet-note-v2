import { Theme, ThemeConfig } from '@/types';

export { Theme };
export type { ThemeConfig };

export const THEME_CONFIGS: Record<Theme, ThemeConfig> = {
    [Theme.MINIMAL]: {
        name: '線條簡約',
        description: '簡潔的線條設計，專注於內容本身',
        background: {
            primary: 'bg-white',
            secondary: 'bg-gray-50',
            accent: 'bg-gray-100',
        },
        button: {
            primary: 'bg-gray-900 text-white hover:bg-gray-800',
            secondary:
                'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
            hover: 'hover:bg-gray-100',
            text: 'text-gray-700',
        },
        input: {
            background: 'bg-white',
            border: 'border-gray-300',
            focus: 'focus:border-gray-500 focus:ring-gray-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
        },
        noteItem: {
            background: 'bg-white',
            border: 'border-gray-200',
            hover: 'hover:bg-gray-50',
            text: 'text-gray-800',
            icon: 'text-gray-600',
        },
        image: {
            src: '/images/minimal-theme.svg',
            alt: '線條簡約主題圖片',
            position: 'top-right',
        },
    },
    [Theme.COLORFUL]: {
        name: '彩色繽紛漸層',
        description: '活潑的漸層色彩，讓筆記更加生動',
        background: {
            primary: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
            secondary: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
            accent: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
        },
        button: {
            primary:
                'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
            secondary:
                'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30',
            hover: 'hover:bg-white/10',
            text: 'text-white',
        },
        input: {
            background: 'bg-white/20 backdrop-blur-sm',
            border: 'border-white/30',
            focus: 'focus:border-white/50 focus:ring-white/50',
            text: 'text-white',
            placeholder: 'placeholder-white/70',
        },
        noteItem: {
            background: 'bg-white/20 backdrop-blur-sm',
            border: 'border-white/30',
            hover: 'hover:bg-white/30',
            text: 'text-white',
            icon: 'text-white/90',
        },
        image: {
            src: '/images/colorful-theme.svg',
            alt: '彩色繽紛漸層主題圖片',
            position: 'center',
        },
    },
    [Theme.GLASS]: {
        name: '玻璃iOS風',
        description: '現代玻璃質感，簡約而優雅',
        background: {
            primary: 'bg-gradient-to-br from-slate-50 to-slate-100',
            secondary: 'bg-white/30 backdrop-blur-md',
            accent: 'bg-white/20 backdrop-blur-sm',
        },
        button: {
            primary:
                'bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 hover:bg-white/30',
            secondary:
                'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 hover:bg-white/20',
            hover: 'hover:bg-white/10',
            text: 'text-slate-800',
        },
        input: {
            background: 'bg-white/20 backdrop-blur-md',
            border: 'border-white/30',
            focus: 'focus:border-white/50 focus:ring-white/30',
            text: 'text-slate-800',
            placeholder: 'placeholder-slate-500',
        },
        noteItem: {
            background: 'bg-white/20 backdrop-blur-md',
            border: 'border-white/30',
            hover: 'hover:bg-white/30',
            text: 'text-slate-800',
            icon: 'text-slate-600',
        },
        image: {
            src: '/images/glass-theme.svg',
            alt: '玻璃iOS風主題圖片',
            position: 'bottom-left',
        },
    },
};

export const getThemeConfig = (theme: Theme): ThemeConfig => {
    return THEME_CONFIGS[theme];
};
