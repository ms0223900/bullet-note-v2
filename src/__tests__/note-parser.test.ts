import {
  extractNoteItems,
  hasNoteItems,
  parseNoteContent,
} from '@/lib/note-parser';

describe('note-parser', () => {
  describe('parseNoteContent', () => {
    it('should parse content with note items starting with -', () => {
      const content = `這是一些文字
- 第一個筆記項目
- 第二個筆記項目
其他文字
- 第三個筆記項目`;

      const result = parseNoteContent(content);

      expect(result).toMatchObject({
        name: '筆記分類',
        items: expect.arrayContaining([
          expect.objectContaining({
            content: '第一個筆記項目',
            type: 'note',
          }),
          expect.objectContaining({
            content: '第二個筆記項目',
            type: 'note',
          }),
          expect.objectContaining({
            content: '第三個筆記項目',
            type: 'note',
          }),
        ]),
      });

      expect(result.items).toHaveLength(3);
    });

    it('should handle empty content', () => {
      const content = '';
      const result = parseNoteContent(content);

      expect(result.items).toHaveLength(0);
      expect(result.name).toBe('筆記分類');
    });

    it('should handle content without note items', () => {
      const content = `這是一些文字
沒有筆記項目
只有普通文字`;

      const result = parseNoteContent(content);

      expect(result.items).toHaveLength(0);
    });

    it('should trim whitespace from note items', () => {
      const content = `-   有空格開頭的筆記項目   `;
      const result = parseNoteContent(content);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].content).toBe('有空格開頭的筆記項目');
    });

    it('should skip empty note items', () => {
      const content = `- 
- 有效的筆記項目
-   `;
      const result = parseNoteContent(content);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].content).toBe('有效的筆記項目');
    });
  });

  describe('hasNoteItems', () => {
    it('should return true when content has note items', () => {
      const content = `- 這是一個筆記項目`;
      expect(hasNoteItems(content)).toBe(true);
    });

    it('should return false when content has no note items', () => {
      const content = `這只是普通文字`;
      expect(hasNoteItems(content)).toBe(false);
    });

    it('should return false for empty content', () => {
      expect(hasNoteItems('')).toBe(false);
    });

    it('should handle content with dashes not at line start', () => {
      const content = `這是一個 - 破折號`;
      expect(hasNoteItems(content)).toBe(false);
    });
  });

  describe('extractNoteItems', () => {
    it('should extract only note items from content', () => {
      const content = `- 第一個筆記
普通文字
- 第二個筆記`;

      const items = extractNoteItems(content);

      expect(items).toHaveLength(2);
      expect(items[0].content).toBe('第一個筆記');
      expect(items[1].content).toBe('第二個筆記');
    });

    it('should return empty array when no note items', () => {
      const content = `只有普通文字`;
      const items = extractNoteItems(content);

      expect(items).toHaveLength(0);
    });
  });
});
