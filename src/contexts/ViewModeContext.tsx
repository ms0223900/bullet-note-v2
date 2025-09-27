'use client';

import { ViewMode } from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ViewModeContextType {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
    undefined
);

interface ViewModeProviderProps {
    children: ReactNode;
}

export const ViewModeProvider = ({ children }: ViewModeProviderProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('single');

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (context === undefined) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
};
