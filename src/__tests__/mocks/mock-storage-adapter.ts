import { StorageAdapter } from '../../lib/storage/types';
import { ParsedNoteItem } from '../../types';

/**
 * Mock 儲存適配器
 * 用於測試，提供記憶體儲存功能
 */
export class MockStorageAdapter implements StorageAdapter {
    private notes: ParsedNoteItem[] = [];
    private editorContent: string = '';

    async saveNotes(notes: ParsedNoteItem[]): Promise<void> {
        this.notes = [...notes];
    }

    async loadNotes(): Promise<ParsedNoteItem[]> {
        return [...this.notes];
    }

    async saveEditorContent(content: string): Promise<void> {
        this.editorContent = content;
    }

    async loadEditorContent(): Promise<string> {
        return this.editorContent;
    }

    async clearAll(): Promise<void> {
        this.notes = [];
        this.editorContent = '';
    }

    async clearNotes(): Promise<void> {
        this.notes = [];
    }

    async clearEditorContent(): Promise<void> {
        this.editorContent = '';
    }

    // 測試輔助方法
    getStoredNotes(): ParsedNoteItem[] {
        return [...this.notes];
    }

    getStoredEditorContent(): string {
        return this.editorContent;
    }

    setStoredNotes(notes: ParsedNoteItem[]): void {
        this.notes = [...notes];
    }

    setStoredEditorContent(content: string): void {
        this.editorContent = content;
    }
}
