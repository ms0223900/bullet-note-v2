import { MockProviders } from '@/__tests__/mocks/mock-theme-provider';
import NotesPage from '@/app/notes/page';
import { BulletSymbol } from '@/lib/bullet-symbols';
import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

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

describe('Dash Button Scenario - 點擊「-」按鈕後輸入文字', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  async function whenRender() {
    return await act(async () => {
      render(
        <MockProviders>
          <NotesPage />
        </MockProviders>
      );
    });
  }

  function whenClickSymbolButton(user: UserEvent, symbol: BulletSymbol) {
    const button = screen.getByTestId(`symbol-${symbol}-insertion-button`);
    return user.click(button);
  }

  it('should enable confirm button after clicking dash button and typing text', async () => {
    const user = userEvent.setup();
    await whenRender();

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('新增筆記');

    // Initially confirm button should be disabled
    expect(confirmButton).toBeDisabled();

    // Step 1: Click the dash button
    await whenClickSymbolButton(user, BulletSymbol.Note);

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
      expect(screen.getByRole('heading', { name: '我的筆記', level: 2 })).toBeInTheDocument();
      expect(screen.getByText('我的筆記內容')).toBeInTheDocument();
    });

    // Step 6: Verify textarea is cleared
    expect(textarea).toHaveValue('');
  });

  it('should handle multiple lines with dash button', async () => {
    const user = userEvent.setup();
    await whenRender();

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('新增筆記');

    // Click dash button and type first line
    await whenClickSymbolButton(user, BulletSymbol.Note);
    await user.type(textarea, '第一個筆記');

    // Move to next line and add another dash
    await user.keyboard('{Enter}');
    await whenClickSymbolButton(user, BulletSymbol.Note);
    await user.type(textarea, '第二個筆記');

    // Button should be enabled
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });

    // Click confirm button
    await user.click(confirmButton);

    // Should save both notes
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '我的筆記', level: 2 })).toBeInTheDocument();
      expect(screen.getByText('第一個筆記')).toBeInTheDocument();
      expect(screen.getByText('第二個筆記')).toBeInTheDocument();
    });
  });

  it('should handle mixed content with dash button', async () => {
    const user = userEvent.setup();
    await whenRender();

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('新增筆記');

    // Type some regular text first
    await user.type(textarea, '這是普通文字');

    // Add a new line and click dash button
    await user.keyboard('{Enter}');
    await whenClickSymbolButton(user, BulletSymbol.Note);
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
      expect(screen.getByRole('heading', { name: '我的筆記', level: 2 })).toBeInTheDocument();
      expect(screen.getByText('這是筆記項目')).toBeInTheDocument();
      // Regular text should not be displayed
      expect(screen.queryByText('這是普通文字')).not.toBeInTheDocument();
      expect(screen.queryByText('更多普通文字')).not.toBeInTheDocument();
    });
  });

  it('should not enable confirm button if only dash symbol without text', async () => {
    const user = userEvent.setup();
    await whenRender();

    const confirmButton = screen.getByText('新增筆記');

    // Click dash button but don't type any text after it
    await whenClickSymbolButton(user, BulletSymbol.Note);

    // Button should remain disabled
    expect(confirmButton).toBeDisabled();

    // Should not display note category section
    expect(screen.queryByText('已保存的筆記記錄')).not.toBeInTheDocument();
  });

  it('should handle rapid clicking and typing', async () => {
    const user = userEvent.setup();
    await whenRender();

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('新增筆記');

    // Rapidly click dash button and type
    await whenClickSymbolButton(user, BulletSymbol.Note);
    await user.type(textarea, '快速筆記');

    // Immediately try to click confirm button
    await user.click(confirmButton);

    // Should work correctly
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '我的筆記', level: 2 })).toBeInTheDocument();
      expect(screen.getByText('快速筆記')).toBeInTheDocument();
    });
  });

  it('should handle all symbol types correctly', async () => {
    const user = userEvent.setup();
    await whenRender();

    const textarea = screen.getByPlaceholderText(/在這裡輸入您的想法/);
    const confirmButton = screen.getByText('新增筆記');

    // Test bullet symbol
    await whenClickSymbolButton(user, BulletSymbol.Task);
    await user.type(textarea, '任務項目');

    // Test event symbol
    await user.keyboard('{Enter}');
    await whenClickSymbolButton(user, BulletSymbol.Event);
    await user.type(textarea, '事件項目');

    // Test dash symbol
    await user.keyboard('{Enter}');
    await whenClickSymbolButton(user, BulletSymbol.Note);
    await user.type(textarea, '筆記項目');

    // Button should be enabled
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });

    // Click confirm button
    await user.click(confirmButton);

    // Should save all three items
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '我的筆記', level: 2 })).toBeInTheDocument();
      expect(screen.getByText('任務項目')).toBeInTheDocument();
      expect(screen.getByText('事件項目')).toBeInTheDocument();
      expect(screen.getByText('筆記項目')).toBeInTheDocument();
    });
  });
});
