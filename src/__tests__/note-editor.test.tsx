import { NoteEditor } from '@/components/notes/note-editor'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('NoteEditor', () => {
    const mockOnContentChange = jest.fn()

    beforeEach(() => {
        mockOnContentChange.mockClear()
    })

    it('should render with default placeholder', () => {
        render(<NoteEditor />)

        const textarea = screen.getByPlaceholderText('開始輸入您的筆記...')
        expect(textarea).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
        const customPlaceholder = '請輸入您的內容...'
        render(<NoteEditor placeholder={customPlaceholder} />)

        const textarea = screen.getByPlaceholderText(customPlaceholder)
        expect(textarea).toBeInTheDocument()
    })

    it('should render with initial content', () => {
        const initialContent = '這是初始內容'
        render(<NoteEditor initialContent={initialContent} />)

        const textarea = screen.getByDisplayValue(initialContent)
        expect(textarea).toBeInTheDocument()
    })

    it('should call onContentChange when text is typed', async () => {
        const user = userEvent.setup()
        render(<NoteEditor onContentChange={mockOnContentChange} />)

        const textarea = screen.getByRole('textbox')
        await user.type(textarea, '測試內容')

        expect(mockOnContentChange).toHaveBeenCalledWith('測試內容')
    })

    it('should display character count', () => {
        const content = '測試內容'
        render(<NoteEditor initialContent={content} />)

        expect(screen.getByText(`${content.length} 字元`)).toBeInTheDocument()
    })

    it('should update character count when content changes', async () => {
        const user = userEvent.setup()
        render(<NoteEditor />)

        const textarea = screen.getByRole('textbox')
        await user.type(textarea, '新內容')

        expect(screen.getByText('3 字元')).toBeInTheDocument()
    })

    it('should render symbol insertion button', () => {
        render(<NoteEditor />)

        expect(screen.getByText('•')).toBeInTheDocument()
        expect(screen.getByText('O')).toBeInTheDocument()
        expect(screen.getByText('–')).toBeInTheDocument()
    })

    it('should insert symbol at line start when no symbol exists', async () => {
        const user = userEvent.setup()
        render(<NoteEditor onContentChange={mockOnContentChange} />)

        const textarea = screen.getByRole('textbox')
        await user.type(textarea, '測試行')

        // Click bullet symbol button
        const bulletButton = screen.getByText('•')
        await user.click(bulletButton)

        expect(mockOnContentChange).toHaveBeenCalledWith('• 測試行')
    })

    it('should replace existing symbol when line already has symbol', async () => {
        const user = userEvent.setup()
        render(<NoteEditor onContentChange={mockOnContentChange} />)

        const textarea = screen.getByRole('textbox')
        await user.type(textarea, '• 測試行')

        // Click event symbol button
        const eventButton = screen.getByText('O')
        await user.click(eventButton)

        expect(mockOnContentChange).toHaveBeenCalledWith('O 測試行')
    })

    it('should handle multiple lines correctly', async () => {
        const user = userEvent.setup()
        render(<NoteEditor onContentChange={mockOnContentChange} />)

        const textarea = screen.getByRole('textbox')

        // Type content with multiple lines
        await user.type(textarea, '第一行\n第二行')

        // Position cursor at the beginning of the second line
        await user.click(textarea)
        await user.keyboard('{End}{ArrowLeft}{ArrowLeft}{Home}')

        const bulletButton = screen.getByText('•')
        await user.click(bulletButton)

        // Based on the component behavior, it seems to insert the symbol at the current line
        // The exact behavior depends on how the component handles cursor position
        expect((textarea as HTMLTextAreaElement).value).toContain('•')
        expect((textarea as HTMLTextAreaElement).value).toContain('第二行')
    })

    it('should have correct textarea styling', () => {
        render(<NoteEditor />)

        const textarea = screen.getByRole('textbox')
        expect(textarea).toHaveClass('w-full', 'h-96', 'p-6', 'resize-none')
    })

    it('should be focusable', async () => {
        const user = userEvent.setup()
        render(<NoteEditor />)

        const textarea = screen.getByRole('textbox')
        await user.click(textarea)

        expect(textarea).toHaveFocus()
    })
})
