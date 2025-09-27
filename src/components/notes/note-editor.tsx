'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { BULLET_SYMBOLS } from '@/lib/bullet-symbols';
import { useRef, useState } from 'react';
import { SymbolInsertionButton } from './symbol-insertion-button';

export interface NoteEditorProps {
  initialContent?: string;
  content?: string; // 新增外部控制的內容
  onConfirm?: () => void;
  onContentChange?: (content: string) => void;
  placeholder?: string;
}

export function NoteEditor({
  initialContent = '',
  content: externalContent,
  onConfirm,
  onContentChange,
  placeholder = '開始輸入您的筆記...',
}: NoteEditorProps) {
  const { themeConfig } = useTheme();
  const [internalContent, setInternalContent] = useState(initialContent);

  // 使用外部內容或內部內容
  const content =
    externalContent !== undefined ? externalContent : internalContent;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setInternalContent(newContent);
    onContentChange?.(newContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd + Enter (Mac) 或 Ctrl + Enter (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onConfirm?.();
    }
  };

  const getCurrentLineInfo = (
    content: string,
    cursorStart: number,
    cursorEnd: number
  ) => {
    const beforeCursor = content.slice(0, cursorStart);
    const afterCursor = content.slice(cursorEnd);

    // 找到當前行的開始位置（上一個換行符後）
    const lastNewlineIndex = beforeCursor.lastIndexOf('\n');
    const lineStart = lastNewlineIndex === -1 ? 0 : lastNewlineIndex + 1;

    // 找到當前行的結束位置（下一個換行符前）
    const nextNewlineIndex = afterCursor.indexOf('\n');
    const lineEnd =
      nextNewlineIndex === -1 ? content.length : cursorStart + nextNewlineIndex;

    // 獲取當前行的內容
    const currentLine = content.slice(lineStart, lineEnd);

    return { lineStart, lineEnd, currentLine };
  };

  const hasExistingSymbol = (line: string): boolean => {
    return new RegExp(`^[${BULLET_SYMBOLS.join('')}]\\s+`).test(line);
  };

  const replaceLineSymbol = (line: string, newSymbol: string): string => {
    const content = line.trim().substring(1).trim();
    return `${newSymbol} ${content}`;
  };

  const insertSymbolAtLineStart = (line: string, symbol: string): string => {
    return `${symbol} ${line}`;
  };

  const calculateNewCursorPosition = (
    oldStart: number,
    lineStart: number,
    symbol: string,
    hasExisting: boolean
  ): number => {
    if (hasExisting) {
      // 如果替換符號，游標位置需要調整
      return lineStart + symbol.length + 1;
    } else {
      // 如果插入符號，游標位置需要加上符號長度
      return oldStart + symbol.length + 1;
    }
  };

  const handleSymbolInsert = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const { lineStart, lineEnd, currentLine } = getCurrentLineInfo(
      content,
      start,
      end
    );

    const hasExisting = hasExistingSymbol(currentLine);
    let newContent: string;

    if (hasExisting) {
      // 如果行首已有符號，替換現有符號
      newContent =
        content.slice(0, lineStart) +
        replaceLineSymbol(currentLine, symbol) +
        content.slice(lineEnd);
    } else {
      // 如果行首沒有符號，在行首插入符號
      newContent =
        content.slice(0, lineStart) +
        insertSymbolAtLineStart(content.slice(lineStart, lineEnd), symbol) +
        content.slice(lineEnd);
    }

    setInternalContent(newContent);
    onContentChange?.(newContent);

    // 更新游標位置
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = calculateNewCursorPosition(
        start,
        lineStart,
        symbol,
        hasExisting
      );
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 符號插入按鈕 */}
      <div className="mb-3 flex justify-start w-full">
        <SymbolInsertionButton onSymbolInsert={handleSymbolInsert} />
      </div>

      <div
        className={`${themeConfig.input.background} border ${themeConfig.input.border} rounded-lg shadow-sm`}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full h-10 md:h-20 p-2 md:p-6 resize-none border-0 rounded-lg focus:outline-none focus:ring-0 ${themeConfig.input.text} ${themeConfig.input.placeholder} font-mono text-sm leading-relaxed cursor-custom`}
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        />
      </div>

    </div>
  );
}
