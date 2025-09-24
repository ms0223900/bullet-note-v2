import { AppError } from '@/types';

interface ErrorAlertProps {
  error: AppError;
  onDismiss: () => void;
}

export function ErrorAlert({ error, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            發生錯誤
          </h3>
          <p className="text-red-600 mb-2">
            {error.message}
          </p>
          {error.code && (
            <p className="text-sm text-red-500">
              錯誤代碼: {error.code}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 text-xl font-bold ml-4"
          title="關閉錯誤訊息"
        >
          ×
        </button>
      </div>
    </div>
  );
}
