'use client';

import { ConfirmButton } from '@/components/notes/confirm-button';
import { NoteCategoryDisplay } from '@/components/notes/note-category-display';
import { NoteEditor } from '@/components/notes/note-editor';
import { useNotesManager } from '@/hooks/useNotesManager';
import { hasNoteItems } from '@/lib/bullet-symbols';
import { parseNoteContent } from '@/lib/note-parser';

export default function NotesPage() {
  const {
    editorContent,
    savedNotes,
    setEditorContent,
    confirmNote,
    deleteItem,
    clickItem,
  } = useNotesManager();

  const hasNotes = hasNoteItems(editorContent);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleConfirm = () => {
    if (hasNotes) {
      const category = parseNoteContent(editorContent);
      confirmNote(category);
    }
  };

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
              content={editorContent}
              placeholder="在這裡輸入您的想法、筆記或任何內容... (使用 - 開頭來建立筆記項目；按 Cmd+Enter / Ctrl+Enter 直接新增)"
              onContentChange={handleContentChange}
              onConfirm={handleConfirm}
            />
          </div>

          {/* 確認按鈕 */}
          <div className="mb-8 flex justify-center">
            <ConfirmButton onClick={handleConfirm} disabled={!hasNotes}>
              確認筆記分類
            </ConfirmButton>
          </div>

          {/* 筆記分類顯示區塊 */}
          {savedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                已保存的筆記記錄 ({savedNotes.length})
              </h2>
              <div className="space-y-6">
                {savedNotes.map((category, index) => (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        筆記記錄 #{index + 1}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {category.createdAt.toLocaleString('zh-TW')}
                      </span>
                    </div>
                    <NoteCategoryDisplay
                      category={category}
                      onItemClick={() => clickItem()}
                      onItemDelete={itemId => deleteItem(itemId, category.id)}
                    />
                  </div>
                ))}
              </div>
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
              <li>• 點擊「確認筆記分類」按鈕來新增筆記記錄到筆記區塊</li>
              <li>• 確認後輸入框會自動清空，可以繼續輸入新的筆記</li>
              <li>
                • 所有已保存的筆記記錄會顯示在下方，可以查看、點擊或刪除筆記項目
              </li>
              <li>• 每個筆記記錄都會顯示創建時間，方便管理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
