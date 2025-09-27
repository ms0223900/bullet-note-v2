'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SmallConfirmButtonProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function SmallConfirmButton({
  className,
  onClick,
  disabled = false,
  children = '新增筆記',
}: SmallConfirmButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="default"
      size="sm"
      className={cn("px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm", className)}
    >
      {children}
    </Button>
  );
}
