import { ThemeProvider } from '@/contexts/ThemeContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { ReactNode } from 'react';

interface MockProvidersProps {
  children: ReactNode;
}

export function MockProviders({ children }: MockProvidersProps) {
  return (
    <ThemeProvider>
      <ViewModeProvider>{children}</ViewModeProvider>
    </ThemeProvider>
  );
}
