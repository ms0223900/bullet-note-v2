'use client';

import { BulletRulesTable } from '@/components/notes/bullet-rules-table';
import { ConfirmButton } from '@/components/notes/confirm-button';
import { NoteEditor } from '@/components/notes/note-editor';
import { UsageTips } from '@/components/notes/usage-tips';
import { useNotesManager } from '@/hooks/useNotesManager';
import { hasNoteItems } from '@/lib/bullet-symbols';
import { getNoteItemDisplayStyle, getNoteItemTypeLabel } from '@/lib/note-display-utils';
import { parseNoteContent } from '@/lib/note-parser';
import { groupSavedNotesByLocalDay } from '@/lib/utils';
import { useMemo } from 'react';

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

  // 依「項目建立的本地日期」分組，並保留刪除時所需的 categoryId 映射
  const groupedByDay = useMemo(
    () => groupSavedNotesByLocalDay(savedNotes),
    [savedNotes]
  );

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleConfirm = () => {
    if (hasNotes) {
      const notes = parseNoteContent(editorContent);
      notes.forEach(item => confirmNote(item));
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

          {/* 依日期分組的筆記顯示區塊 */}
          {groupedByDay.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                已保存的筆記（依日期）
              </h2>
              <div className="space-y-6">
                {groupedByDay.map(group => (
                  <div
                    key={group.key}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {group.key}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {group.entries.length} 項
                      </span>
                    </div>
                    <div className="p-1">
                      <div className="space-y-3">
                        {group.entries.map(item => {
                          const displayStyle = getNoteItemDisplayStyle(item);
                          const typeLabel = getNoteItemTypeLabel(item);

                          return (
                            <div
                              key={item.id}
                              className={`group flex items-start space-x-3 p-3 ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`}
                            >
                              <div className="flex-shrink-0 mt-1">
                                <span className={`text-lg ${displayStyle.iconColor}`}>
                                  {displayStyle.icon}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`text-xs px-2 py-1 rounded-full ${displayStyle.iconColor} ${displayStyle.bgColor} border ${displayStyle.borderColor}`}>
                                    {typeLabel}
                                  </span>
                                </div>
                                <p
                                  className="text-gray-800 text-sm leading-relaxed cursor-pointer"
                                  onClick={() => clickItem()}
                                >
                                  {item.content}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {item.createdAt.toLocaleString('zh-TW')}
                                </p>
                              </div>
                              <div className="flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    const confirmed =
                                      window.confirm(
                                        '確定要刪除這個筆記項目嗎？'
                                      );
                                    if (confirmed) {
                                      deleteItem(item.id);
                                    }
                                  }}
                                  className="text-gray-400 hover:text-red-500 text-sm"
                                  title="刪除筆記"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 使用說明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              使用說明
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-blue-900 mb-2">子彈筆記規則</div>
                <BulletRulesTable />
              </div>
              <UsageTips />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
