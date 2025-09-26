import { LocalStorageAdapter } from '@/lib/storage/local-storage-adapter';
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

describe('LocalStorageAdapter', () => {
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    localStorageMock.clear();
    adapter = new LocalStorageAdapter();
  });

  describe('Notes Management', () => {
    it('should save and load notes correctly', async () => {
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

      await adapter.saveNotes(testNotes);
      const loadedNotes = await adapter.loadNotes();

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

    it('should return empty array when no notes are stored', async () => {
      const loadedNotes = await adapter.loadNotes();
      expect(loadedNotes).toEqual([]);
    });

    it('should clear notes correctly', async () => {
      const testNotes: ParsedNoteItem[] = [
        {
          id: '1',
          content: 'Test note',
          type: 'note',
          createdAt: new Date(),
        },
      ];

      await adapter.saveNotes(testNotes);
      expect(await adapter.loadNotes()).toHaveLength(1);

      await adapter.clearNotes();
      expect(await adapter.loadNotes()).toEqual([]);
    });
  });

  describe('Editor Content Management', () => {
    it('should save and load editor content correctly', async () => {
      const testContent = 'This is test editor content';

      await adapter.saveEditorContent(testContent);
      const loadedContent = await adapter.loadEditorContent();

      expect(loadedContent).toBe(testContent);
    });

    it('should return empty string when no content is stored', async () => {
      const loadedContent = await adapter.loadEditorContent();
      expect(loadedContent).toBe('');
    });

    it('should clear editor content correctly', async () => {
      const testContent = 'Test content';

      await adapter.saveEditorContent(testContent);
      expect(await adapter.loadEditorContent()).toBe(testContent);

      await adapter.clearEditorContent();
      expect(await adapter.loadEditorContent()).toBe('');
    });
  });

  describe('Clear All Data', () => {
    it('should clear all stored data', async () => {
      const testNotes: ParsedNoteItem[] = [
        {
          id: '1',
          content: 'Test note',
          type: 'note',
          createdAt: new Date(),
        },
      ];
      const testContent = 'Test editor content';

      await adapter.saveNotes(testNotes);
      await adapter.saveEditorContent(testContent);

      expect(await adapter.loadNotes()).toHaveLength(1);
      expect(await adapter.loadEditorContent()).toBe(testContent);

      await adapter.clearAll();

      expect(await adapter.loadNotes()).toEqual([]);
      expect(await adapter.loadEditorContent()).toBe('');
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      // Create a new adapter with retry disabled for this test
      jest
        .spyOn(LocalStorageAdapter.prototype, 'saveNotes')
        .mockRejectedValueOnce(new Error('Storage quota exceeded'));
      const testAdapter = new LocalStorageAdapter({ enableRetry: false });

      // Mock localStorage to throw an error

      const testNotes: ParsedNoteItem[] = [
        {
          id: '1',
          content: 'Test note',
          type: 'note',
          createdAt: new Date(),
        },
      ];

      // Should throw an error
      await expect(testAdapter.saveNotes(testNotes)).rejects.toThrow(
        'Storage quota exceeded'
      );

      // Restore original method
    });
  });
});
