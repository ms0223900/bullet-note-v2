'use client';

import { Header } from '@/components/layout/header';
import { BulletRulesTable } from '@/components/notes/bullet-rules-table';
import { NoteEditor } from '@/components/notes/note-editor';
import { NotesList } from '@/components/notes/notes-list';
import { SmallConfirmButton } from '@/components/notes/small-confirm-button';
import { UsageTips } from '@/components/notes/usage-tips';
import { ErrorAlert } from '@/components/ui/error-alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTheme } from '@/contexts/ThemeContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { useNotesManager } from '@/hooks/useNotesManager';
import { hasNoteItems } from '@/lib/bullet-symbols';
import { parseNoteContent } from '@/lib/note-parser';
import { StorageFactory, StorageType } from '@/lib/storage';
import { groupSavedNotesByLocalDay } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';

export default function NotesPage() {
  const { themeConfig } = useTheme();
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
      <Header />
      <div
        className={`min-h-screen ${themeConfig.background.primary} relative pb-32`}
      >
        <ThemeImage />
        <div className="relative z-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 頁面標題 */}
            <div className="mb-8">
              <h1
                className={`text-3xl font-bold mb-2 ${themeConfig.noteItem.note.text}`}
              >
                我的筆記
              </h1>
              <p className={`${themeConfig.noteItem.note.text} opacity-70`}>
                管理您的子彈筆記，快速記錄想法、任務和筆記
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

            {/* 依日期分組的筆記顯示區塊 - 主要內容區域 */}
            <NotesList
              groupedNotes={groupedByDay}
              onDeleteItem={deleteItem}
              onItemClick={clickItem}
            />

            {/* 使用說明 */}
            <div
              className={`mt-8 ${themeConfig.background.secondary} border ${themeConfig.noteItem.note.border} rounded-lg p-4 mb-20 md:mb-20`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${themeConfig.noteItem.note.text}`}
              >
                使用說明
              </h3>
              <div className="space-y-4">
                <div>
                  <div
                    className={`text-sm mb-2 ${themeConfig.noteItem.note.text} opacity-80`}
                  >
                    子彈筆記規則
                  </div>
                  <BulletRulesTable />
                </div>
                <UsageTips />
              </div>
            </div>
          </div>
        </div>

        {/* 固定在底部的編輯區域 */}
        <div
          className={`fixed bottom-0 left-0 right-0 ${themeConfig.background.secondary} border-t ${themeConfig.noteItem.note.border} shadow-lg z-50`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto">
              {/* 筆記編輯器 */}
              <div className="relative z-1">
                <NoteEditor
                  content={editorContent}
                  placeholder="在這裡輸入您的想法、筆記或任何內容... (使用 - 開頭來建立筆記項目；按 Cmd+Enter / Ctrl+Enter 直接新增)"
                  onContentChange={handleContentChange}
                  onConfirm={handleConfirm}
                />
                <div className='pt-2 md:pt-0'>
                  <SmallConfirmButton
                    className='md:absolute bottom-2 right-2 w-full md:w-auto'
                    onClick={handleConfirm}
                    disabled={!hasNotes || isLoading}
                  >
                    新增筆記
                    <ChevronRight className="w-4 h-4" />
                  </SmallConfirmButton>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </ViewModeProvider>
  );
}
