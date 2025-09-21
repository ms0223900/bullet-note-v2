'use client';

import { Button } from '@/components/ui/button';

interface SymbolInsertionButtonProps {
  onSymbolInsert: (symbol: string) => void;
}

export function SymbolInsertionButton({
  onSymbolInsert,
}: SymbolInsertionButtonProps) {
  const symbols = [
    { symbol: '•', label: '任務' },
    { symbol: 'O', label: '事件' },
    { symbol: '–', label: '筆記' },
  ];

  return (
    <div className="flex gap-1">
      {symbols.map(({ symbol, label }) => (
        <Button
          key={symbol}
          onClick={() => onSymbolInsert(symbol)}
          variant="outline"
          size="sm"
          className="min-w-8 h-8 text-base font-normal hover:bg-gray-100 hover:scale-105 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-300 rounded-md bg-white"
          title={label}
        >
          {symbol}
        </Button>
      ))}
    </div>
  );
}
