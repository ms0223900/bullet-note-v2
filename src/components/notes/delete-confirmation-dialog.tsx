import { DeleteConfirmationDialogProps } from '@/types';
import { memo } from 'react';

const DeleteConfirmationDialogComponent = ({
  isOpen,
  onConfirm,
  onCancel,
  title = '確認刪除',
  message = '確定要刪除這個筆記項目嗎？',
}: DeleteConfirmationDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteConfirmationDialog = memo(DeleteConfirmationDialogComponent);
