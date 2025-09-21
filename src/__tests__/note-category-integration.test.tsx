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
            expect(screen.getByText('筆記分類結果')).toBeInTheDocument();
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
        expect(screen.queryByText('筆記分類結果')).not.toBeInTheDocument();
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

        // Should log the clicked item
        expect(consoleSpy).toHaveBeenCalledWith(
            '點擊筆記項目:',
            expect.objectContaining({
                content: '測試筆記項目',
                type: 'note',
            })
        );

        consoleSpy.mockRestore();
    });
});
