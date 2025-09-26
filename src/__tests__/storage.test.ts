import { ParsedNoteItem } from '@/types';

// Mock localStorage with proper JSON handling
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Import after mocking localStorage
import { LocalStorageManager } from '@/lib/storage';

describe('LocalStorageManager', () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    describe('Notes Management', () => {
        it('should save and load notes correctly', () => {
            const testNotes: ParsedNoteItem[] = [
                {
                    id: '1',
                    content: 'Test note 1',
                    type: 'note',
                    createdAt: new Date('2024-01-01T00:00:00Z'),
                },
                {
                    id: '2',
                    content: 'Test note 2',
                    type: 'task',
                    isCompleted: false,
                    createdAt: new Date('2024-01-02T00:00:00Z'),
                },
            ];

            LocalStorageManager.saveNotes(testNotes);
            const loadedNotes = LocalStorageManager.loadNotes();

            expect(loadedNotes).toHaveLength(2);
            expect(loadedNotes[0].id).toBe(testNotes[0].id);
            expect(loadedNotes[0].content).toBe(testNotes[0].content);
            expect(loadedNotes[0].type).toBe(testNotes[0].type);
            expect(loadedNotes[1].id).toBe(testNotes[1].id);
            expect(loadedNotes[1].content).toBe(testNotes[1].content);
            expect(loadedNotes[1].type).toBe(testNotes[1].type);
            // 檢查 Date 物件是否正確反序列化
            const loadedDate1 = new Date(loadedNotes[0].createdAt);
            const loadedDate2 = new Date(loadedNotes[1].createdAt);
            expect(loadedDate1.getTime()).toBe(testNotes[0].createdAt.getTime());
            expect(loadedDate2.getTime()).toBe(testNotes[1].createdAt.getTime());
        });

        it('should return empty array when no notes are stored', () => {
            const loadedNotes = LocalStorageManager.loadNotes();
            expect(loadedNotes).toEqual([]);
        });

        it('should clear notes correctly', () => {
            const testNotes: ParsedNoteItem[] = [
                {
                    id: '1',
                    content: 'Test note',
                    type: 'note',
                    createdAt: new Date(),
                },
            ];

            LocalStorageManager.saveNotes(testNotes);
            expect(LocalStorageManager.loadNotes()).toHaveLength(1);

            LocalStorageManager.clearNotes();
            expect(LocalStorageManager.loadNotes()).toEqual([]);
        });
    });

    describe('Editor Content Management', () => {
        it('should save and load editor content correctly', () => {
            const testContent = 'This is test editor content';

            LocalStorageManager.saveEditorContent(testContent);
            const loadedContent = LocalStorageManager.loadEditorContent();

            expect(loadedContent).toBe(testContent);
        });

        it('should return empty string when no content is stored', () => {
            const loadedContent = LocalStorageManager.loadEditorContent();
            expect(loadedContent).toBe('');
        });

        it('should clear editor content correctly', () => {
            const testContent = 'Test content';

            LocalStorageManager.saveEditorContent(testContent);
            expect(LocalStorageManager.loadEditorContent()).toBe(testContent);

            LocalStorageManager.clearEditorContent();
            expect(LocalStorageManager.loadEditorContent()).toBe('');
        });
    });

    describe('Clear All Data', () => {
        it('should clear all stored data', () => {
            const testNotes: ParsedNoteItem[] = [
                {
                    id: '1',
                    content: 'Test note',
                    type: 'note',
                    createdAt: new Date(),
                },
            ];
            const testContent = 'Test editor content';

            LocalStorageManager.saveNotes(testNotes);
            LocalStorageManager.saveEditorContent(testContent);

            expect(LocalStorageManager.loadNotes()).toHaveLength(1);
            expect(LocalStorageManager.loadEditorContent()).toBe(testContent);

            LocalStorageManager.clearAll();

            expect(LocalStorageManager.loadNotes()).toEqual([]);
            expect(LocalStorageManager.loadEditorContent()).toBe('');
        });
    });

    describe('Error Handling', () => {
        it('should handle localStorage errors gracefully', () => {
            // Mock localStorage to throw an error
            const originalSetItem = localStorageMock.setItem;
            localStorageMock.setItem = jest.fn(() => {
                throw new Error('Storage quota exceeded');
            });

            const testNotes: ParsedNoteItem[] = [
                {
                    id: '1',
                    content: 'Test note',
                    type: 'note',
                    createdAt: new Date(),
                },
            ];

            // Should not throw an error
            expect(() => {
                LocalStorageManager.saveNotes(testNotes);
            }).not.toThrow();

            // Should return fallback value
            const loadedNotes = LocalStorageManager.loadNotes();
            expect(loadedNotes).toEqual([]);

            // Restore original method
            localStorageMock.setItem = originalSetItem;
        });
    });
});
