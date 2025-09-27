'use client';

import { BulletRulesTable } from '@/components/notes/bullet-rules-table';
import { ConfirmButton } from '@/components/notes/confirm-button';
import { NoteEditor } from '@/components/notes/note-editor';
import { NotesList } from '@/components/notes/notes-list';
import { UsageTips } from '@/components/notes/usage-tips';
import { ErrorAlert } from '@/components/ui/error-alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { useNotesManager } from '@/hooks/useNotesManager';
import { hasNoteItems } from '@/lib/bullet-symbols';
import { parseNoteContent } from '@/lib/note-parser';
import { StorageFactory, StorageType } from '@/lib/storage';
import { groupSavedNotesByLocalDay } from '@/lib/utils';
import { useCallback, useMemo } from 'react';

export default function NotesPage() {
  const {
    editorContent,
    savedNotes,
    isLoading,
    error,
    setEditorContent,
    confirmNote,
    deleteItem,
    clickItem,
    clearError,
  } = useNotesManager(StorageFactory.createStorage(StorageType.LOCAL_STORAGE));

  const hasNotes = hasNoteItems(editorContent);

  // 依「項目建立的本地日期」分組，並保留刪除時所需的 categoryId 映射
  const groupedByDay = useMemo(
    () => groupSavedNotesByLocalDay(savedNotes),
    [savedNotes]
  );

  const handleContentChange = useCallback(
    (content: string) => {
      setEditorContent(content);
    },
    [setEditorContent]
  );

  const handleConfirm = useCallback(() => {
    if (hasNotes) {
      const notes = parseNoteContent(editorContent);
      notes.forEach(item => confirmNote(item));
    }
  }, [hasNotes, editorContent, confirmNote]);

  return (
    <ViewModeProvider>
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

            {/* 錯誤顯示 */}
            {error && <ErrorAlert error={error} onDismiss={clearError} />}

            {/* 載入中狀態 */}
            {isLoading && (
              <div className="mb-4 flex justify-center">
                <LoadingSpinner text="處理中..." />
              </div>
            )}

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
              <ConfirmButton
                onClick={handleConfirm}
                disabled={!hasNotes || isLoading}
              >
                確認筆記分類
              </ConfirmButton>
            </div>

            {/* 依日期分組的筆記顯示區塊 */}
            <NotesList
              groupedNotes={groupedByDay}
              onDeleteItem={deleteItem}
              onItemClick={clickItem}
            />

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
    </ViewModeProvider>
  );
}
