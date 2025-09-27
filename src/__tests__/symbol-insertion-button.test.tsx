import { MockProviders } from '@/__tests__/mocks/mock-theme-provider';
import { SymbolInsertionButton } from '@/components/notes/symbol-insertion-button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SymbolInsertionButton', () => {
  const mockOnSymbolInsert = jest.fn();

  beforeEach(() => {
    mockOnSymbolInsert.mockClear();
  });

  function whenRender() {
    return render(
      <MockProviders>
        <SymbolInsertionButton onSymbolInsert={mockOnSymbolInsert} />
      </MockProviders>
    );
  }

  it('should render all symbol buttons', () => {
    whenRender();

    expect(screen.getByText('•')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('should call onSymbolInsert when bullet button is clicked', async () => {
    const user = userEvent.setup();
    whenRender();

    const bulletButton = screen.getByText('•');
    await user.click(bulletButton);

    expect(mockOnSymbolInsert).toHaveBeenCalledWith('•');
  });

  it('should call onSymbolInsert when event button is clicked', async () => {
    const user = userEvent.setup();
    whenRender();

    const eventButton = screen.getByText('O');
    await user.click(eventButton);

    expect(mockOnSymbolInsert).toHaveBeenCalledWith('O');
  });

  it('should call onSymbolInsert when note button is clicked', async () => {
    const user = userEvent.setup();
    whenRender();

    const noteButton = screen.getByText('-');
    await user.click(noteButton);

    expect(mockOnSymbolInsert).toHaveBeenCalledWith('-');
  });

  it('should have correct button titles', () => {
    whenRender();

    expect(screen.getByTitle('任務')).toBeInTheDocument();
    expect(screen.getByTitle('事件')).toBeInTheDocument();
    expect(screen.getByTitle('筆記')).toBeInTheDocument();
  });

  it('should render buttons with correct styling classes', () => {
    whenRender();

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('h-8', 'text-base', 'font-normal');
    });
  });
});
