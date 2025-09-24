import { NoteEditor } from '@/components/notes/note-editor';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NoteEditor Integration Tests', () => {
  it('should work with symbol insertion and content editing together', async () => {
    const user = userEvent.setup();
    const mockOnContentChange = jest.fn();

    render(<NoteEditor onContentChange={mockOnContentChange} />);

    const textarea = screen.getByRole('textbox');

    // Type some content
    await user.type(textarea, '我的任務');

    // Insert bullet symbol
    const bulletButton = screen.getByText('•');
    await user.click(bulletButton);

    // Verify the symbol was inserted
    expect(mockOnContentChange).toHaveBeenCalledWith('• 我的任務');

    // Add more content
    await user.type(textarea, '\n另一個任務');

    // Insert event symbol on second line
    const eventButton = screen.getByText('O');
    await user.click(eventButton);

    // Verify both lines have symbols
    expect(mockOnContentChange).toHaveBeenCalledWith(
      '• 我的任務\nO 另一個任務'
    );
  });

  it('should maintain cursor position after symbol insertion', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);

    const textarea = screen.getByRole('textbox');

    // Type content and position cursor in middle
    await user.type(textarea, '測試內容');
    await user.click(textarea);
    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}'); // Move to middle

    // Insert symbol
    const bulletButton = screen.getByText('•');
    await user.click(bulletButton);

    // Verify content was modified correctly
    expect(textarea).toHaveValue('• 測試內容');
  });

  it('should handle rapid symbol insertions', async () => {
    const user = userEvent.setup();
    const mockOnContentChange = jest.fn();

    render(<NoteEditor onContentChange={mockOnContentChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, '測試');

    // Rapidly click different symbol buttons
    const bulletButton = screen.getByText('•');
    const eventButton = screen.getByText('O');
    const noteButton = screen.getByText('-');

    await user.click(bulletButton);
    await user.click(eventButton);
    await user.click(noteButton);

    // Should end up with the last symbol
    expect(mockOnContentChange).toHaveBeenCalledWith('- 測試');
  });

  it('should trigger onConfirm when pressing Cmd/Ctrl + Enter', async () => {
    const user = userEvent.setup();
    const mockOnConfirm = jest.fn();

    render(<NoteEditor onConfirm={mockOnConfirm} />);

    const textarea = screen.getByRole('textbox');
    await user.click(textarea);
    await user.type(textarea, '一些內容');

    // Simulate Cmd + Enter (Meta on macOS)
    await user.keyboard('{Meta>}{Enter}{/Meta}');
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);

    // Simulate Ctrl + Enter (Windows/Linux)
    await user.keyboard('{Control>}{Enter}{/Control}');
    expect(mockOnConfirm).toHaveBeenCalledTimes(2);
  });
});
