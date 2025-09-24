import { ParsedNoteItem, UseNotesManagerReturn, AppError } from '@/types';
import { useCallback, useState } from 'react';

/**
 * 統一的筆記狀態管理 Hook
 * 負責管理編輯器內容、確認的分類和已保存的筆記
 */
export const useNotesManager = (): UseNotesManagerReturn => {
  const [editorContent, setEditorContent] = useState('');
  const [savedNotes, setSavedNotes] = useState<ParsedNoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  // 清除錯誤
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 確認筆記並添加到保存列表
  const confirmNote = useCallback((category: ParsedNoteItem) => {
    try {
      setIsLoading(true);
      setError(null);

      setSavedNotes(prev => [...prev, category]);
      setEditorContent(''); // 清空編輯器
    } catch (err) {
      setError({
        message: '確認筆記時發生錯誤',
        code: 'CONFIRM_NOTE_ERROR',
        details: err,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 清空編輯器
  const clearEditor = useCallback(() => {
    try {
      setEditorContent('');
      setError(null);
    } catch (err) {
      setError({
        message: '清空編輯器時發生錯誤',
        code: 'CLEAR_EDITOR_ERROR',
        details: err,
      });
    }
  }, []);

  // 刪除筆記項目
  const deleteItem = useCallback((itemId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      setSavedNotes(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      setError({
        message: '刪除筆記項目時發生錯誤',
        code: 'DELETE_ITEM_ERROR',
        details: err,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 點擊筆記項目
  const clickItem = useCallback(() => {
    try {
      // 未來可以在這裡添加更多邏輯，如編輯、標記完成等
      // 目前暫時不做任何操作，保留此方法以便未來擴展
      setError(null);
    } catch (err) {
      setError({
        message: '處理筆記項目點擊時發生錯誤',
        code: 'CLICK_ITEM_ERROR',
        details: err,
      });
    }
  }, []);

  return {
    // 狀態
    editorContent,
    savedNotes,
    isLoading,
    error,

    // 操作方法
    setEditorContent,
    confirmNote,
    clearEditor,
    deleteItem,
    clickItem,
    clearError,
  };
};
