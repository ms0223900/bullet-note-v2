import { useNotesManager } from '@/hooks/useNotesManager';
import { ParsedNoteItem } from '@/types';
import { act, renderHook } from '@testing-library/react';
import { MockStorageAdapter } from './mocks/mock-storage-adapter';

// Create a global mock adapter instance
const globalMockAdapter = new MockStorageAdapter();

// Mock the storage factory to return our mock adapter
jest.mock('@/lib/storage', () => ({
    StorageFactory: {
        createStorage: jest.fn(() => globalMockAdapter),
    },
    StorageType: {
        LOCAL_STORAGE: 'localStorage',
    },
}));

describe('useNotesManager with Storage Integration', () => {
    beforeEach(() => {
        // Clear the mock adapter state
        globalMockAdapter.clearAll();
        jest.clearAllMocks();
    });

    it('should load data from storage on initialization', async () => {
        const mockNotes: ParsedNoteItem[] = [
            {
                id: '1',
                content: 'Saved note',
                type: 'note',
                createdAt: new Date('2024-01-01'),
            },
        ];
        const mockEditorContent = 'Saved editor content';

        globalMockAdapter.setStoredNotes(mockNotes);
        globalMockAdapter.setStoredEditorContent(mockEditorContent);

        const { result } = renderHook(() => useNotesManager());

        // Wait for async operations to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.savedNotes).toEqual(mockNotes);
        expect(result.current.editorContent).toBe(mockEditorContent);
    });

    it('should save notes to storage when notes change', async () => {
        const { result } = await whenRenderHook();

        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'New note',
            type: 'note',
            createdAt: new Date(),
        };

        await act(async () => {
            result.current.confirmNote(testNote);
        });

        // Check that the note was added to state
        expect(result.current.savedNotes).toEqual([testNote]);

        // Wait for auto-save to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 10));
        });

        expect(globalMockAdapter.getStoredNotes()).toEqual([testNote]);
    });

    it('should save editor content to storage when content changes', async () => {
        const { result } = await whenRenderHook();

        const testContent = 'New editor content';

        await act(async () => {
            result.current.setEditorContent(testContent);
        });

        // Check that the content was set in state
        expect(result.current.editorContent).toBe(testContent);

        // Wait for auto-save to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 10));
        });

        expect(globalMockAdapter.getStoredEditorContent()).toBe(testContent);
    });

    it('should clear editor content from storage when clearEditor is called', async () => {
        const { result } = renderHook(() => useNotesManager());

        await act(async () => {
            await result.current.clearEditor();
        });

        expect(globalMockAdapter.getStoredEditorContent()).toBe('');
        expect(result.current.editorContent).toBe('');
    });

    it('should clear all data from storage when clearAllData is called', async () => {
        const { result } = renderHook(() => useNotesManager());

        // First add some data
        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'Test note',
            type: 'note',
            createdAt: new Date(),
        };

        await act(async () => {
            result.current.confirmNote(testNote);
            result.current.setEditorContent('Test content');
        });

        // Then clear all data
        await act(async () => {
            await result.current.clearAllData();
        });

        expect(globalMockAdapter.getStoredNotes()).toEqual([]);
        expect(globalMockAdapter.getStoredEditorContent()).toBe('');
        expect(result.current.savedNotes).toEqual([]);
        expect(result.current.editorContent).toBe('');
    });

    it('should handle storage errors gracefully during initialization', async () => {
        // Create a mock adapter that throws errors
        const errorAdapter = new MockStorageAdapter();
        jest.spyOn(errorAdapter, 'loadNotes').mockRejectedValue(new Error('Storage error'));

        // Mock the factory to return the error adapter
        const { StorageFactory } = require('@/lib/storage');
        StorageFactory.createStorage.mockReturnValueOnce(errorAdapter);

        const { result } = renderHook(() => useNotesManager());

        // Wait for async operations to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.error).toBeTruthy();
        expect(result.current.error?.message).toBe('載入儲存資料時發生錯誤');
        expect(result.current.error?.code).toBe('LOAD_DATA_ERROR');
    });

    it('should persist data across multiple hook instances', async () => {
        const testNote: ParsedNoteItem = {
            id: '1',
            content: 'Persistent note',
            type: 'note',
            createdAt: new Date(),
        };

        // First hook instance
        const { result: result1 } = await whenRenderHook();

        await act(async () => {
            result1.current.confirmNote(testNote);
            result1.current.setEditorContent('Persistent content');
            // Wait for auto-save to complete
            await new Promise(resolve => setTimeout(resolve, 10));
        });

        // Second hook instance should load the same data
        const { result: result2 } = await whenRenderHook();

        // Wait for async operations to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 10));
        });

        expect(result2.current.savedNotes).toEqual([testNote]);
        expect(result2.current.editorContent).toBe('Persistent content');
    });

    async function whenRenderHook() {
        return await act(async () => {
            return renderHook(() => useNotesManager());
        });
    }
});
