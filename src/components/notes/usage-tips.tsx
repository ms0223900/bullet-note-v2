'use client';

interface UsageTipsProps {
  className?: string;
}

export function UsageTips({ className }: UsageTipsProps) {
  return (
    <div
      className={`bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 ${className ?? ''}`}
    >
      <div className="font-semibold mb-2">操作提示</div>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>使用符號開頭建立項目，例如：- 或 － 或 ・</li>
        <li>在文字編輯區按 Cmd+Enter（或 Ctrl+Enter）可快速確認</li>
        <li>可使用上方「符號插入」按鈕，快速切換行首符號</li>
      </ul>
    </div>
  );
}
