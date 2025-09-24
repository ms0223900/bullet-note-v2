// 筆記分類相關類型
export interface ParsedNoteItem {
  id: string;
  content: string;
  type: 'bullet' | 'task' | 'note';
  isCompleted?: boolean;
  createdAt: Date;
}
