import { ParsedNoteItem } from '../../types';

/**
 * 儲存介面定義
 * 定義了所有儲存方式需要實作的方法
 */
export interface StorageAdapter {
  /**
   * 儲存筆記列表
   * @param notes 要儲存的筆記列表
   * @returns Promise<void>
   */
  saveNotes(notes: ParsedNoteItem[]): Promise<void>;

  /**
   * 讀取筆記列表
   * @returns Promise<ParsedNoteItem[]> 儲存的筆記列表
   */
  loadNotes(): Promise<ParsedNoteItem[]>;

  /**
   * 儲存編輯器內容
   * @param content 編輯器內容
   * @returns Promise<void>
   */
  saveEditorContent(content: string): Promise<void>;

  /**
   * 讀取編輯器內容
   * @returns Promise<string> 編輯器內容
   */
  loadEditorContent(): Promise<string>;

  /**
   * 清除所有儲存的資料
   * @returns Promise<void>
   */
  clearAll(): Promise<void>;

  /**
   * 清除已保存的筆記
   * @returns Promise<void>
   */
  clearNotes(): Promise<void>;

  /**
   * 清除編輯器內容
   * @returns Promise<void>
   */
  clearEditorContent(): Promise<void>;
}

/**
 * 儲存錯誤類型
 */
export interface StorageError {
  message: string;
  code: string;
  details?: unknown;
}

/**
 * 儲存配置選項
 */
export interface StorageConfig {
  /**
   * 儲存鍵值前綴
   */
  keyPrefix?: string;

  /**
   * 是否啟用錯誤重試
   */
  enableRetry?: boolean;

  /**
   * 重試次數
   */
  retryCount?: number;

  /**
   * 重試間隔（毫秒）
   */
  retryDelay?: number;
}
