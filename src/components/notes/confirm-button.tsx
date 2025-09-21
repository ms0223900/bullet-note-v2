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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {children}
        </Button>
    );
}
