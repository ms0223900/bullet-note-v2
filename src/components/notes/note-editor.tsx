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
    const newContent = content.slice(0, start) + symbol + content.slice(end);

    setContent(newContent);
    onContentChange?.(newContent);

    // 設定游標位置到插入符號後
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
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
