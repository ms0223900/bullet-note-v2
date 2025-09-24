import { ParsedNoteItem } from '@/types';
import { useCallback, useState } from 'react';

interface UseNotesManagerReturn {
  // 狀態
  editorContent: string;
  savedNotes: ParsedNoteItem[];

  // 操作方法
  setEditorContent: (content: string) => void;
  confirmNote: (category: ParsedNoteItem) => void;
  clearEditor: () => void;
  deleteItem: (itemId: string) => void;
  clickItem: () => void;
}

/**
 * 統一的筆記狀態管理 Hook
 * 負責管理編輯器內容、確認的分類和已保存的筆記
 */
export const useNotesManager = (): UseNotesManagerReturn => {
  const [editorContent, setEditorContent] = useState('');
  const [savedNotes, setSavedNotes] = useState<ParsedNoteItem[]>([]);

  // 確認筆記並添加到保存列表
  const confirmNote = useCallback((category: ParsedNoteItem) => {
    setSavedNotes(prev => [...prev, category]);
    setEditorContent(''); // 清空編輯器
  }, []);

  // 清空編輯器
  const clearEditor = useCallback(() => {
    setEditorContent('');
  }, []);

  // 刪除筆記項目
  const deleteItem = useCallback((itemId: string) => {
    setSavedNotes(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // 點擊筆記項目
  const clickItem = useCallback(() => {
    // 未來可以在這裡添加更多邏輯，如編輯、標記完成等
    // 目前暫時不做任何操作，保留此方法以便未來擴展
  }, []);

  return {
    // 狀態
    editorContent,
    savedNotes,

    // 操作方法
    setEditorContent,
    confirmNote,
    clearEditor,
    deleteItem,
    clickItem,
  };
};
