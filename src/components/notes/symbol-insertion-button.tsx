'use client';

import { Button } from '@/components/ui/button';
import { BULLET_SYMBOLS, SYMBOL_LABELS } from '@/lib/bullet-symbols';

interface SymbolInsertionButtonProps {
  onSymbolInsert: (symbol: string) => void;
}

export function SymbolInsertionButton({
  onSymbolInsert,
}: SymbolInsertionButtonProps) {
  const symbols = BULLET_SYMBOLS.map(symbol => ({
    symbol,
    label: SYMBOL_LABELS[symbol],
  }));

  return (
    <div className="flex gap-1 w-full">
      {symbols.map(({ symbol, label }) => (
        <Button
          key={symbol}
          onClick={() => onSymbolInsert(symbol)}
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-base font-normal hover:scale-105 active:scale-95 transition-all duration-200"
          title={label}
          data-testid={`symbol-${symbol}-insertion-button`}
        >
          {symbol}
        </Button>
      ))}
    </div>
  );
}
