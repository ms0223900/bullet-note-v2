/**
 * ID 生成工具函數
 */

/**
 * 生成唯一的 ID
 * @param prefix ID 前綴
 * @returns 格式化的唯一 ID
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * 生成筆記項目的 ID
 * @returns 筆記項目 ID
 */
export function generateNoteItemId(): string {
  return generateId('note');
}

/**
 * 生成筆記分類的 ID
 * @returns 筆記分類 ID
 */
export function generateCategoryId(): string {
  return generateId('category');
}
