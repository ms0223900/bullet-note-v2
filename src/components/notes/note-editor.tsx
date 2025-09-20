'use client';

import { useState } from 'react';

interface NoteEditorProps {
    initialContent?: string;
    onContentChange?: (content: string) => void;
    placeholder?: string;
}

export function NoteEditor({
    initialContent = '',
    onContentChange,
    placeholder = '開始輸入您的筆記...'
}: NoteEditorProps) {
    const [content, setContent] = useState(initialContent);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        onContentChange?.(newContent);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white border border-black rounded-lg shadow-sm">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder={placeholder}
                    className="w-full h-96 p-6 resize-none border-0 rounded-lg focus:outline-none focus:ring-0 text-black placeholder-gray-500 font-mono text-sm leading-relaxed"
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
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
