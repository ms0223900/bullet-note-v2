'use client';

import { useViewMode } from '@/contexts/ViewModeContext';
import { ViewMode } from '@/types';

const ViewModeToggle = () => {
  const { viewMode, setViewMode } = useViewMode();

  const viewModes: { mode: ViewMode; label: string; icon: string }[] = [
    { mode: ViewMode.SINGLE, label: '單欄式', icon: '≡' },
    { mode: ViewMode.DOUBLE, label: '雙欄式', icon: '⋮' },
    { mode: ViewMode.GRID, label: '網格式', icon: '⊞' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
      <span className="text-sm text-gray-600 mr-2">檢視模式：</span>
      {viewModes.map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`
            flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${
              viewMode === mode
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }
          `}
          title={label}
        >
          <span className="text-base">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export { ViewModeToggle };
