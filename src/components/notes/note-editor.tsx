'use client';

import { useRef, useState } from 'react';
import { SymbolInsertionButton } from './symbol-insertion-button';

interface NoteEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
}

export function NoteEditor({
  initialContent = '',
  onContentChange,
  placeholder = '開始輸入您的筆記...',
}: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange?.(newContent);
  };

  const handleSymbolInsert = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 找到當前行的開始和結束位置
    const beforeCursor = content.slice(0, start);
    const afterCursor = content.slice(end);

    // 找到當前行的開始位置（上一個換行符後）
    const lastNewlineIndex = beforeCursor.lastIndexOf('\n');
    const lineStart = lastNewlineIndex === -1 ? 0 : lastNewlineIndex + 1;

    // 找到當前行的結束位置（下一個換行符前）
    const nextNewlineIndex = afterCursor.indexOf('\n');
    const lineEnd = nextNewlineIndex === -1 ? content.length : start + nextNewlineIndex;

    // 獲取當前行的內容
    const currentLine = content.slice(lineStart, lineEnd);

    // 檢查當前行是否已經有符號
    const hasSymbol = /^[•O–]\s/.test(currentLine);

    if (hasSymbol) {
      // 如果行首已有符號，替換現有符號
      const newContent = content.slice(0, lineStart) + symbol + ' ' + currentLine.slice(2) + content.slice(lineEnd);
      setContent(newContent);
      onContentChange?.(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + (symbol.length - (currentLine.startsWith('•') ? 1 : currentLine.startsWith('O') ? 1 : currentLine.startsWith('–') ? 1 : 0)), start + (symbol.length - (currentLine.startsWith('•') ? 1 : currentLine.startsWith('O') ? 1 : currentLine.startsWith('–') ? 1 : 0)));
      }, 0);
    } else {
      // 如果行首沒有符號，在行首插入符號
      const newContent = content.slice(0, lineStart) + symbol + ' ' + content.slice(lineStart);
      setContent(newContent);
      onContentChange?.(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + symbol.length + 1, start + symbol.length + 1);
      }, 0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 符號插入按鈕 */}
      <div className="mb-3 flex justify-start">
        <SymbolInsertionButton onSymbolInsert={handleSymbolInsert} />
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
          className="w-full h-96 p-6 resize-none border-0 rounded-lg focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500 font-mono text-sm leading-relaxed cursor-custom"
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        />
      </div>

      {/* 字數統計 */}
      <div className="mt-2 text-right text-sm text-gray-500">
        {content.length} 字元
      </div>
    </div>
  );
}
