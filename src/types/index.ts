// 筆記分類相關類型
export type NoteItemType = 'bullet' | 'task' | 'note';

// 筆記項目類型樣式
export interface NoteItemTypeStyles {
  background: string;
  border: string;
  hover: string;
  text: string;
  icon: string;
  iconColor: string;
}

// 檢視模式相關類型
export enum ViewMode {
  SINGLE = 'single',
  DOUBLE = 'double',
  GRID = 'grid',
}

// 主題相關類型
export enum Theme {
  MINIMAL = 'minimal',
  COLORFUL = 'colorful',
  GLASS = 'glass',
}

export interface ThemeConfig {
  name: string;
  description: string;
  background: {
    primary: string;
    secondary: string;
    accent: string;
  };
  button: {
    primary: string;
    secondary: string;
    hover: string;
    text: string;
  };
  input: {
    background: string;
    border: string;
    focus: string;
    text: string;
    placeholder: string;
  };
  noteItem: Record<NoteItemType, NoteItemTypeStyles>;
  image?: {
    src: string;
    alt: string;
    position:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
  };
}

export interface ParsedNoteItem {
  id: string;
  content: string;
  type: NoteItemType;
  isCompleted?: boolean;
  createdAt: Date;
}

// 顯示樣式相關類型
export interface NoteItemDisplayStyle {
  container: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
  text: string;
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
  viewMode?: ViewMode;
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
