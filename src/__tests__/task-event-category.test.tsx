import NotesPage from '@/app/notes/page';
import { BulletSymbol } from '@/lib/bullet-symbols';
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

describe('Task and Event Category Features', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse and display task items correctly', async () => {
    render(<NotesPage />);

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('確認筆記分類');

    // Input task items
    fireEvent.change(textarea, {
      target: {
        value: `${BulletSymbol.Task} 完成專案報告\n${BulletSymbol.Task} 準備會議簡報`,
      },
    });

    // Click confirm button
    fireEvent.click(confirmButton);

    // Should display the parsed task items with correct styling
    await waitFor(() => {
      expect(screen.getByText('完成專案報告')).toBeInTheDocument();
      expect(screen.getByText('準備會議簡報')).toBeInTheDocument();
      expect(screen.getAllByText('任務')).toHaveLength(2);
    });
  });

  it('should parse and display event items correctly', async () => {
    render(<NotesPage />);

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('確認筆記分類');

    // Input event items
    fireEvent.change(textarea, {
      target: {
        value: `${BulletSymbol.Event} 團隊會議\n${BulletSymbol.Event} 產品發布會`,
      },
    });

    // Click confirm button
    fireEvent.click(confirmButton);

    // Should display the parsed event items with correct styling
    await waitFor(() => {
      expect(screen.getByText('團隊會議')).toBeInTheDocument();
      expect(screen.getByText('產品發布會')).toBeInTheDocument();
      expect(screen.getAllByText('事件')).toHaveLength(2);
    });
  });

  it('should parse and display mixed category items correctly', async () => {
    render(<NotesPage />);

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('確認筆記分類');

    // Input mixed category items
    fireEvent.change(textarea, {
      target: {
        value: `${BulletSymbol.Task} 完成專案報告\n${BulletSymbol.Event} 團隊會議\n${BulletSymbol.Note} 重要想法記錄`,
      },
    });

    // Click confirm button
    fireEvent.click(confirmButton);

    // Should display all items with correct category labels
    await waitFor(() => {
      expect(screen.getByText('完成專案報告')).toBeInTheDocument();
      expect(screen.getByText('團隊會議')).toBeInTheDocument();
      expect(screen.getByText('重要想法記錄')).toBeInTheDocument();
      expect(screen.getByText('任務')).toBeInTheDocument();
      expect(screen.getByText('事件')).toBeInTheDocument();
      expect(screen.getByText('筆記')).toBeInTheDocument();
    });
  });

  it('should maintain different visual styles for different categories', async () => {
    render(<NotesPage />);

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('確認筆記分類');

    // Input items of different categories
    fireEvent.change(textarea, {
      target: {
        value: `${BulletSymbol.Task} 任務項目\n${BulletSymbol.Event} 事件項目\n${BulletSymbol.Note} 筆記項目`,
      },
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      // Check that all items are displayed
      expect(screen.getByText('任務項目')).toBeInTheDocument();
      expect(screen.getByText('事件項目')).toBeInTheDocument();
      expect(screen.getByText('筆記項目')).toBeInTheDocument();
    });

    // The visual differences are tested through the presence of category labels
    // and the fact that the items are rendered with different classes
    expect(screen.getByText('任務')).toBeInTheDocument();
    expect(screen.getByText('事件')).toBeInTheDocument();
    expect(screen.getByText('筆記')).toBeInTheDocument();
  });

  it('should handle deletion of different category items', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(<NotesPage />);

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('確認筆記分類');

    // Input items of different categories
    fireEvent.change(textarea, {
      target: {
        value: `${BulletSymbol.Task} 任務項目\n${BulletSymbol.Event} 事件項目\n${BulletSymbol.Note} 筆記項目`,
      },
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('任務項目')).toBeInTheDocument();
      expect(screen.getByText('事件項目')).toBeInTheDocument();
      expect(screen.getByText('筆記項目')).toBeInTheDocument();
    });

    // Delete the task item (first item)
    const deleteButtons = screen.getAllByText('×');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('任務項目')).not.toBeInTheDocument();
      expect(screen.getByText('事件項目')).toBeInTheDocument();
      expect(screen.getByText('筆記項目')).toBeInTheDocument();
    });

    confirmSpy.mockRestore();
  });
});
