'use client';

import { NoteCategory, ParsedNoteItem } from '@/types';

interface NoteCategoryDisplayProps {
  category: NoteCategory;
  onItemClick?: (item: ParsedNoteItem) => void;
  onItemDelete?: (itemId: string) => void;
}

export function NoteCategoryDisplay({
  category,
  onItemClick,
  onItemDelete,
}: NoteCategoryDisplayProps) {
  if (category.items.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {category.name}
        </h3>
        <p className="text-gray-500 text-sm">尚無筆記項目</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* 分類標題 */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-500">
          {category.items.length} 個筆記項目
        </p>
      </div>

      {/* 筆記項目列表 */}
      <div className="p-4">
        <div className="space-y-3">
          {category.items.map(item => (
            <NoteItem
              key={item.id}
              item={item}
              onClick={() => onItemClick?.(item)}
              onDelete={() => onItemDelete?.(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NoteItemProps {
  item: ParsedNoteItem;
  onClick?: () => void;
  onDelete?: () => void;
}

function NoteItem({ item, onClick, onDelete }: NoteItemProps) {
  return (
    <div className="group flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {/* 筆記符號 */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* 筆記內容 */}
      <div className="flex-1 min-w-0">
        <p
          className="text-gray-800 text-sm leading-relaxed cursor-pointer"
          onClick={onClick}
        >
          {item.content}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {item.createdAt.toLocaleString('zh-TW')}
        </p>
      </div>

      {/* 操作按鈕：手機常駐顯示（sm 以下），桌機 hover 顯示 */}
      <div className="flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 text-sm"
          title="刪除筆記"
        >
          ×
        </button>
      </div>
    </div>
  );
}
