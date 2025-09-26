import { useNotesManager } from '@/hooks/useNotesManager';
import { LocalStorageManager } from '@/lib/storage';
import { ParsedNoteItem } from '@/types';
import { act, renderHook } from '@testing-library/react';

// Mock localStorage
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

// Mock LocalStorageManager methods
jest.mock('@/lib/storage', () => ({
    LocalStorageManager: {
        loadNotes: jest.fn(() => []),
        loadEditorContent: jest.fn(() => ''),
        saveNotes: jest.fn(),
        saveEditorContent: jest.fn(),
        clearAll: jest.fn(),
        clearEditorContent: jest.fn(),
    },
}));

describe('useNotesManager with Local Storage Integration', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    it('should load data from localStorage on initialization', () => {
        const mockNotes: ParsedNoteItem[] = [
            {
                id: '1',
                content: 'Saved note',
                type: 'note',
                createdAt: new Date('2024-01-01'),
            },
        ];
        const mockEditorContent = 'Saved editor content';

        (LocalStorageManager.loadNotes as jest.Mock).mockReturnValue(mockNotes);
        (LocalStorageManager.loadEditorContent as jest.Mock).mockReturnValue(
            mockEditorContent
        );

        const { result } = renderHook(() => useNotesManager());

        expect(LocalStorageManager.loadNotes).toHaveBeenCalled();
        expect(LocalStorageManager.loadEditorContent).toHaveBeenCalled();
        expect(result.current.savedNotes).toEqual(mockNotes);
        expect(result.current.editorContent).toBe(mockEditorContent);
    });

    it('should save notes to localStorage when notes change', () => {
        // Reset mocks to return empty initial state
        (LocalStorageManager.loadNotes as jest.Mock).mockReturnValue([]);
        (LocalStorageManager.loadEditorContent as jest.Mock).mockReturnValue('');

        const { result } = renderHook(() => useNotesManager());

        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'New note',
            type: 'note',
            createdAt: new Date(),
        };

        act(() => {
            result.current.confirmNote(testNote);
        });

        expect(LocalStorageManager.saveNotes).toHaveBeenCalledWith([testNote]);
    });

    it('should save editor content to localStorage when content changes', () => {
        const { result } = renderHook(() => useNotesManager());

        const testContent = 'New editor content';

        act(() => {
            result.current.setEditorContent(testContent);
        });

        expect(LocalStorageManager.saveEditorContent).toHaveBeenCalledWith(
            testContent
        );
    });

    it('should clear editor content from localStorage when clearEditor is called', () => {
        const { result } = renderHook(() => useNotesManager());

        act(() => {
            result.current.clearEditor();
        });

        expect(LocalStorageManager.clearEditorContent).toHaveBeenCalled();
        expect(result.current.editorContent).toBe('');
    });

    it('should clear all data from localStorage when clearAllData is called', () => {
        const { result } = renderHook(() => useNotesManager());

        // First add some data
        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'Test note',
            type: 'note',
            createdAt: new Date(),
        };

        act(() => {
            result.current.confirmNote(testNote);
            result.current.setEditorContent('Test content');
        });

        // Then clear all data
        act(() => {
            result.current.clearAllData();
        });

        expect(LocalStorageManager.clearAll).toHaveBeenCalled();
        expect(result.current.savedNotes).toEqual([]);
        expect(result.current.editorContent).toBe('');
    });

    it('should handle localStorage errors gracefully during initialization', () => {
        (LocalStorageManager.loadNotes as jest.Mock).mockImplementation(() => {
            throw new Error('Storage error');
        });

        const { result } = renderHook(() => useNotesManager());

        expect(result.current.error).toBeTruthy();
        expect(result.current.error?.message).toBe('載入儲存資料時發生錯誤');
        expect(result.current.error?.code).toBe('LOAD_DATA_ERROR');
    });

    it('should persist data across multiple hook instances', () => {
        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'Persistent note',
            type: 'note',
            createdAt: new Date(),
        };

        // First hook instance
        const { result: result1 } = renderHook(() => useNotesManager());

        act(() => {
            result1.current.confirmNote(testNote);
            result1.current.setEditorContent('Persistent content');
        });

        // Second hook instance should load the same data
        (LocalStorageManager.loadNotes as jest.Mock).mockReturnValue([testNote]);
        (LocalStorageManager.loadEditorContent as jest.Mock).mockReturnValue(
            'Persistent content'
        );

        const { result: result2 } = renderHook(() => useNotesManager());

        expect(result2.current.savedNotes).toEqual([testNote]);
        expect(result2.current.editorContent).toBe('Persistent content');
    });
});
