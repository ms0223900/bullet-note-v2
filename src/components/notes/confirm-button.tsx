'use client';

import { Button } from '@/components/ui/button';

interface ConfirmButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ConfirmButton({
  onClick,
  disabled = false,
  children = '確認',
}: ConfirmButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="default"
      size="lg"
      className="px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
    >
      {children}
    </Button>
  );
}
