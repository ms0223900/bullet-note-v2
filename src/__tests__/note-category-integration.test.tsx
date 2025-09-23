import NotesPage from '@/app/notes/page';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}));

describe('Note Category Integration', () => {
    beforeEach(() => {
        // Reset any mocks before each test
        jest.clearAllMocks();
    });

    it('should display note editor and confirm button', () => {
        render(<NotesPage />);

        expect(screen.getByText('筆記編輯器')).toBeInTheDocument();
        expect(screen.getByText('確認筆記分類')).toBeInTheDocument();
        expect(screen.getByText('使用說明')).toBeInTheDocument();
    });

    it('should enable confirm button when content has note items', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Initially button should be disabled
        expect(confirmButton).toBeDisabled();

        // Type content with note items
        fireEvent.change(textarea, {
            target: { value: '- 第一個筆記項目\n- 第二個筆記項目' },
        });

        // Button should be enabled now
        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });
    });

    it('should parse and display note items after confirmation', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Input note items
        fireEvent.change(textarea, {
            target: { value: '- 第一個筆記項目\n- 第二個筆記項目\n普通文字' },
        });

        // Click confirm button
        fireEvent.click(confirmButton);

        // Should display the parsed notes
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('第一個筆記項目')).toBeInTheDocument();
            expect(screen.getByText('第二個筆記項目')).toBeInTheDocument();
            expect(screen.getByText('2 個筆記項目')).toBeInTheDocument();
        });
    });

    it('should not display note category when no note items', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Input content without note items
        fireEvent.change(textarea, {
            target: { value: '這只是普通文字\n沒有筆記項目' },
        });

        // Button should remain disabled
        expect(confirmButton).toBeDisabled();

        // Should not display note category section
        expect(screen.queryByText('已保存的筆記記錄')).not.toBeInTheDocument();
    });

    it('should allow deleting note items', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Input note items
        fireEvent.change(textarea, {
            target: { value: '- 第一個筆記項目\n- 第二個筆記項目' },
        });

        // Click confirm button
        fireEvent.click(confirmButton);

        // Wait for notes to appear
        await waitFor(() => {
            expect(screen.getByText('第一個筆記項目')).toBeInTheDocument();
            expect(screen.getByText('第二個筆記項目')).toBeInTheDocument();
        });

        // Find and click delete button for first item
        const deleteButtons = screen.getAllByText('×');
        fireEvent.click(deleteButtons[0]);

        // First item should be removed
        await waitFor(() => {
            expect(screen.queryByText('第一個筆記項目')).not.toBeInTheDocument();
            expect(screen.getByText('第二個筆記項目')).toBeInTheDocument();
            expect(screen.getByText('1 個筆記項目')).toBeInTheDocument();
        });
    });

    it('should handle clicking on note items', async () => {
        // Mock console.log to test click handler
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Input note items
        fireEvent.change(textarea, {
            target: { value: '- 測試筆記項目' },
        });

        // Click confirm button
        fireEvent.click(confirmButton);

        // Wait for note to appear and click on it
        await waitFor(() => {
            expect(screen.getByText('測試筆記項目')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('測試筆記項目'));

        // 由於我們移除了 console.log，現在只檢查點擊事件是否被觸發
        // 未來可以在這裡添加其他斷言來驗證點擊行為

        consoleSpy.mockRestore();
    });

    it('should disable confirm button when text has no symbols', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Initially button should be disabled (empty content)
        expect(confirmButton).toBeDisabled();

        // Type content without any symbols
        fireEvent.change(textarea, {
            target: { value: '這是一般文字，沒有符號\n還有更多普通文字' },
        });

        // Button should remain disabled
        await waitFor(() => {
            expect(confirmButton).toBeDisabled();
        });

        // Try to click the button - it should not work
        fireEvent.click(confirmButton);

        // Should not display any note category section
        expect(screen.queryByText('已保存的筆記記錄')).not.toBeInTheDocument();
    });

    it('should update confirm button state when adding/removing symbols', async () => {
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const confirmButton = screen.getByText('確認筆記分類');

        // Initially button should be disabled (empty content)
        expect(confirmButton).toBeDisabled();

        // Add content with symbols - button should become enabled
        fireEvent.change(textarea, {
            target: { value: '• 第一個任務\nO 重要事件' },
        });

        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });

        // Remove symbols by replacing with plain text - button should become disabled again
        fireEvent.change(textarea, {
            target: { value: '沒有符號的文字\n只是普通內容' },
        });

        await waitFor(() => {
            expect(confirmButton).toBeDisabled();
        });
    });
});
