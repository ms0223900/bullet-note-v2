import { StorageAdapter, StorageConfig, StorageError } from './types';

/**
 * 基礎儲存適配器
 * 提供通用的錯誤處理和重試機制
 */
export abstract class BaseStorageAdapter implements StorageAdapter {
  protected config: Required<StorageConfig>;

  constructor(config: StorageConfig = {}) {
    this.config = {
      keyPrefix: config.keyPrefix || 'bullet-note',
      enableRetry: config.enableRetry ?? true,
      retryCount: config.retryCount || 3,
      retryDelay: config.retryDelay || 1000,
    };
  }

  /**
   * 執行帶重試機制的操作
   */
  protected async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retryCount; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt < this.config.retryCount && this.config.enableRetry) {
          console.warn(
            `${operationName} failed (attempt ${attempt}/${this.config.retryCount}), retrying in ${this.config.retryDelay}ms...`,
            error
          );
          await this.delay(this.config.retryDelay);
        }
      }
    }

    throw this.createStorageError(
      `${operationName} failed after ${this.config.retryCount} attempts`,
      'OPERATION_FAILED',
      lastError
    );
  }

  /**
   * 延遲執行
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 建立儲存錯誤物件
   */
  protected createStorageError(
    message: string,
    code: string,
    details?: unknown
  ): StorageError {
    return {
      message,
      code,
      details,
    };
  }

  /**
   * 生成完整的儲存鍵值
   */
  protected getStorageKey(key: string): string {
    return `${this.config.keyPrefix}-${key}`;
  }

  // 抽象方法，需要子類別實作
  abstract saveNotes(notes: any[]): Promise<void>;
  abstract loadNotes(): Promise<any[]>;
  abstract saveEditorContent(content: string): Promise<void>;
  abstract loadEditorContent(): Promise<string>;
  abstract clearAll(): Promise<void>;
  abstract clearNotes(): Promise<void>;
  abstract clearEditorContent(): Promise<void>;
}
