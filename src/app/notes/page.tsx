'use client';

import { ConfirmButton } from '@/components/notes/confirm-button';
import { NoteCategoryDisplay } from '@/components/notes/note-category-display';
import { NoteEditor } from '@/components/notes/note-editor';
import { hasNoteItems, parseNoteContent } from '@/lib/note-parser';
import { NoteCategory, ParsedNoteItem } from '@/types';
import { useState } from 'react';

export default function NotesPage() {
  const [editorContent, setEditorContent] = useState('');
  const [confirmedCategory, setConfirmedCategory] =
    useState<NoteCategory | null>(null);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleConfirm = () => {
    if (hasNoteItems(editorContent)) {
      const category = parseNoteContent(editorContent);
      setConfirmedCategory(category);
    }
  };

  const handleItemClick = (item: ParsedNoteItem) => {
    console.log('點擊筆記項目:', item);
  };

  const handleItemDelete = (itemId: string) => {
    if (confirmedCategory) {
      const updatedCategory = {
        ...confirmedCategory,
        items: confirmedCategory.items.filter(item => item.id !== itemId),
      };
      setConfirmedCategory(updatedCategory);
    }
  };

  const hasNotes = hasNoteItems(editorContent);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">筆記編輯器</h1>
            <p className="text-gray-600">
              這是個子彈筆記的文字編輯區塊，提供快速記錄想法、任務和筆記的專業環境
            </p>
          </div>

          {/* 筆記編輯器 */}
          <div className="mb-6">
            <NoteEditor
              placeholder="在這裡輸入您的想法、筆記或任何內容... (使用 - 開頭來建立筆記項目)"
              onContentChange={handleContentChange}
            />
          </div>

          {/* 確認按鈕 */}
          <div className="mb-8 flex justify-center">
            <ConfirmButton onClick={handleConfirm} disabled={!hasNotes}>
              確認筆記分類
            </ConfirmButton>
          </div>

          {/* 筆記分類顯示區塊 */}
          {confirmedCategory && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                筆記分類結果
              </h2>
              <NoteCategoryDisplay
                category={confirmedCategory}
                onItemClick={handleItemClick}
                onItemDelete={handleItemDelete}
              />
            </div>
          )}

          {/* 使用說明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              使用說明
            </h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>
                • 在編輯器中輸入以{' '}
                <code className="bg-blue-100 px-1 rounded">-</code>{' '}
                開頭的行來建立筆記項目
              </li>
              <li>• 點擊「確認筆記分類」按鈕來解析和顯示筆記項目</li>
              <li>• 在筆記分類區塊中可以查看、點擊或刪除筆記項目</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
