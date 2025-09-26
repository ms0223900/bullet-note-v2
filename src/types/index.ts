// 筆記分類相關類型
export type NoteItemType = 'bullet' | 'task' | 'note';

export interface ParsedNoteItem {
  id: string;
  content: string;
  type: NoteItemType;
  isCompleted?: boolean;
  createdAt: Date;
}

// 顯示樣式相關類型
export interface NoteItemDisplayStyle {
  icon: string;
  iconColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
}

// 分組筆記相關類型
export interface GroupedNotes {
  key: string;
  entries: ParsedNoteItem[];
}

// 組件 Props 相關類型
export interface NoteItemProps {
  item: ParsedNoteItem;
  onDelete: (itemId: string) => void;
  onClick: () => void;
}

export interface NotesListProps {
  groupedNotes: GroupedNotes[];
  onDeleteItem: (itemId: string) => void;
  onItemClick: () => void;
}

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

// 錯誤處理相關類型
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

// Hook 返回類型
export interface UseNotesManagerReturn {
  // 狀態
  editorContent: string;
  savedNotes: ParsedNoteItem[];
  isLoading: boolean;
  error: AppError | null;

  // 操作方法
  setEditorContent: (content: string) => void;
  confirmNote: (note: ParsedNoteItem) => void;
  clearEditor: () => void;
  deleteItem: (itemId: string) => void;
  clickItem: () => void;
  clearError: () => void;
  clearAllData: () => void;
}
