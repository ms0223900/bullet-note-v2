'use client';

import { Button, ButtonGroup, Tooltip } from '@chakra-ui/react';

interface SymbolInsertionButtonProps {
    onSymbolInsert: (symbol: string) => void;
}

export function SymbolInsertionButton({ onSymbolInsert }: SymbolInsertionButtonProps) {
    const symbols = [
        { symbol: '•', label: '實心圓點' },
        { symbol: 'O', label: '空心圓圈' },
        { symbol: '–', label: '短橫線' }
    ];

    return (
        <ButtonGroup
            size="sm"
            variant="outline"
            spacing={1}
            isAttached
        >
            {symbols.map(({ symbol, label }) => (
                <Tooltip
                    key={symbol}
                    label={label}
                    placement="top"
                    hasArrow
                >
                    <Button
                        onClick={() => onSymbolInsert(symbol)}
                        colorScheme="gray"
                        variant="ghost"
                        size="sm"
                        minW="32px"
                        h="32px"
                        fontSize="16px"
                        fontWeight="normal"
                        _hover={{
                            bg: 'gray.100',
                            transform: 'scale(1.05)'
                        }}
                        _active={{
                            bg: 'gray.200',
                            transform: 'scale(0.95)'
                        }}
                        transition="all 0.2s"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="6px"
                        bg="white"
                    >
                        {symbol}
                    </Button>
                </Tooltip>
            ))}
        </ButtonGroup>
    );
}
