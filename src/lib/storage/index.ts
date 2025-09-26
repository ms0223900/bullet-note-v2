// 匯出所有儲存相關的類別和介面
export { BaseStorageAdapter } from './base-adapter';
export { LocalStorageAdapter } from './local-storage-adapter';
export { StorageFactory, StorageType } from './storage-factory';
export type { StorageAdapter, StorageConfig, StorageError } from './types';

// 匯出預設的儲存實例
export { StorageFactory as default } from './storage-factory';
