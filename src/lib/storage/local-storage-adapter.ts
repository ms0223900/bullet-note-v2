import { ParsedNoteItem } from '../../types';
import { BaseStorageAdapter } from './base-adapter';
import { StorageConfig } from './types';

/**
 * LocalStorage 儲存適配器
 * 實作基於瀏覽器 localStorage 的儲存功能
 */
export class LocalStorageAdapter extends BaseStorageAdapter {
    private static readonly STORAGE_KEYS = {
        SAVED_NOTES: 'saved-notes',
        EDITOR_CONTENT: 'editor-content',
    } as const;

    constructor(config?: StorageConfig) {
        super(config);
    }

    /**
     * 檢查瀏覽器是否支援 Local Storage
     */
    private isStorageAvailable(): boolean {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 安全地執行 Local Storage 操作
     */
    private async safeStorageOperation<T>(
        operation: () => T,
        fallback: T,
        operationName: string
    ): Promise<T> {
        if (!this.isStorageAvailable()) {
            throw this.createStorageError(
                'Local Storage is not available',
                'STORAGE_NOT_AVAILABLE'
            );
        }

        try {
            return operation();
        } catch (error) {
            throw this.createStorageError(
                `Local Storage operation failed: ${operationName}`,
                'STORAGE_OPERATION_FAILED',
                error
            );
        }
    }

    /**
     * 儲存已保存的筆記列表
     */
    async saveNotes(notes: ParsedNoteItem[]): Promise<void> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    const serializedNotes = JSON.stringify(
                        notes.map(note => ({
                            ...note,
                            createdAt: note.createdAt.getTime(),
                        }))
                    );
                    localStorage.setItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.SAVED_NOTES),
                        serializedNotes
                    );
                },
                undefined,
                'saveNotes'
            );
        }, 'saveNotes');
    }

    /**
     * 讀取已保存的筆記列表
     */
    async loadNotes(): Promise<ParsedNoteItem[]> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    const stored = localStorage.getItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.SAVED_NOTES)
                    );
                    if (!stored) return [];

                    return JSON.parse(stored, (key, value) => {
                        if (key === 'createdAt') {
                            return new Date(value);
                        }
                        return value;
                    });
                },
                [],
                'loadNotes'
            );
        }, 'loadNotes');
    }

    /**
     * 儲存編輯器內容
     */
    async saveEditorContent(content: string): Promise<void> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    localStorage.setItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.EDITOR_CONTENT),
                        content
                    );
                },
                undefined,
                'saveEditorContent'
            );
        }, 'saveEditorContent');
    }

    /**
     * 讀取編輯器內容
     */
    async loadEditorContent(): Promise<string> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    return (
                        localStorage.getItem(
                            this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.EDITOR_CONTENT)
                        ) || ''
                    );
                },
                '',
                'loadEditorContent'
            );
        }, 'loadEditorContent');
    }

    /**
     * 清除所有儲存的資料
     */
    async clearAll(): Promise<void> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    localStorage.removeItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.SAVED_NOTES)
                    );
                    localStorage.removeItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.EDITOR_CONTENT)
                    );
                },
                undefined,
                'clearAll'
            );
        }, 'clearAll');
    }

    /**
     * 清除已保存的筆記
     */
    async clearNotes(): Promise<void> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    localStorage.removeItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.SAVED_NOTES)
                    );
                },
                undefined,
                'clearNotes'
            );
        }, 'clearNotes');
    }

    /**
     * 清除編輯器內容
     */
    async clearEditorContent(): Promise<void> {
        return this.executeWithRetry(async () => {
            return this.safeStorageOperation(
                () => {
                    localStorage.removeItem(
                        this.getStorageKey(LocalStorageAdapter.STORAGE_KEYS.EDITOR_CONTENT)
                    );
                },
                undefined,
                'clearEditorContent'
            );
        }, 'clearEditorContent');
    }
}
