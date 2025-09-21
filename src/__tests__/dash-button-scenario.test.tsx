import NotesPage from '@/app/notes/page';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('Dash Button Scenario - 點擊「–」按鈕後輸入文字', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should enable confirm button after clicking dash button and typing text', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Initially confirm button should be disabled
        expect(confirmButton).toBeDisabled();

        // Step 1: Click the dash button
        await user.click(dashButton);

        // Step 2: Type some text after the dash
        await user.type(textarea, '我的筆記內容');

        // Step 3: Check if confirm button is now enabled
        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });

        // Step 4: Try to click the confirm button
        await user.click(confirmButton);

        // Step 5: Verify the button click worked and note was saved
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('我的筆記內容')).toBeInTheDocument();
        });

        // Step 6: Verify textarea is cleared
        expect(textarea).toHaveValue('');
    });

    it('should handle multiple lines with dash button', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Click dash button and type first line
        await user.click(dashButton);
        await user.type(textarea, '第一個筆記');

        // Move to next line and add another dash
        await user.keyboard('{Enter}');
        await user.click(dashButton);
        await user.type(textarea, '第二個筆記');

        // Button should be enabled
        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });

        // Click confirm button
        await user.click(confirmButton);

        // Should save both notes
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('第一個筆記')).toBeInTheDocument();
            expect(screen.getByText('第二個筆記')).toBeInTheDocument();
        });
    });

    it('should handle mixed content with dash button', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Type some regular text first
        await user.type(textarea, '這是普通文字');

        // Add a new line and click dash button
        await user.keyboard('{Enter}');
        await user.click(dashButton);
        await user.type(textarea, '這是筆記項目');

        // Add more regular text
        await user.keyboard('{Enter}');
        await user.type(textarea, '更多普通文字');

        // Button should be enabled (because there's at least one note item)
        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });

        // Click confirm button
        await user.click(confirmButton);

        // Should only save the note item, not regular text
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('這是筆記項目')).toBeInTheDocument();
            // Regular text should not be displayed
            expect(screen.queryByText('這是普通文字')).not.toBeInTheDocument();
            expect(screen.queryByText('更多普通文字')).not.toBeInTheDocument();
        });
    });

    it('should not enable confirm button if only dash symbol without text', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Click dash button but don't type any text after it
        await user.click(dashButton);

        // Button should remain disabled
        expect(confirmButton).toBeDisabled();

        // Should not display note category section
        expect(screen.queryByText('已保存的筆記記錄')).not.toBeInTheDocument();
    });

    it('should handle rapid clicking and typing', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Rapidly click dash button and type
        await user.click(dashButton);
        await user.type(textarea, '快速筆記');

        // Immediately try to click confirm button
        await user.click(confirmButton);

        // Should work correctly
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('快速筆記')).toBeInTheDocument();
        });
    });

    it('should handle all symbol types correctly', async () => {
        const user = userEvent.setup();
        render(<NotesPage />);

        const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
        const bulletButton = screen.getByText('•');
        const eventButton = screen.getByText('O');
        const dashButton = screen.getByText('–');
        const confirmButton = screen.getByText('確認筆記分類');

        // Test bullet symbol
        await user.click(bulletButton);
        await user.type(textarea, '任務項目');

        // Test event symbol
        await user.keyboard('{Enter}');
        await user.click(eventButton);
        await user.type(textarea, '事件項目');

        // Test dash symbol
        await user.keyboard('{Enter}');
        await user.click(dashButton);
        await user.type(textarea, '筆記項目');

        // Button should be enabled
        await waitFor(() => {
            expect(confirmButton).not.toBeDisabled();
        });

        // Click confirm button
        await user.click(confirmButton);

        // Should save all three items
        await waitFor(() => {
            expect(screen.getByText('已保存的筆記記錄 (1)')).toBeInTheDocument();
            expect(screen.getByText('任務項目')).toBeInTheDocument();
            expect(screen.getByText('事件項目')).toBeInTheDocument();
            expect(screen.getByText('筆記項目')).toBeInTheDocument();
        });
    });
});
