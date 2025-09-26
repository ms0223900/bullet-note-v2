import { LocalStorageAdapter } from './local-storage-adapter';
import { StorageAdapter, StorageConfig } from './types';

/**
 * 儲存類型枚舉
 */
export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  // 未來可以添加更多儲存類型
  // CLOUD_STORAGE = 'cloudStorage',
  // INDEXED_DB = 'indexedDB',
  // WEBSQL = 'webSQL',
}

/**
 * 儲存工廠類別
 * 負責建立不同類型的儲存適配器
 */
export class StorageFactory {
  /**
   * 建立儲存適配器
   * @param type 儲存類型
   * @param config 儲存配置
   * @returns StorageAdapter 實例
   */
  static createStorage(
    type: StorageType,
    config?: StorageConfig
  ): StorageAdapter {
    switch (type) {
      case StorageType.LOCAL_STORAGE:
        return new LocalStorageAdapter(config);

      // 未來可以添加更多儲存類型的實作
      // case StorageType.CLOUD_STORAGE:
      //   return new CloudStorageAdapter(config);
      // case StorageType.INDEXED_DB:
      //   return new IndexedDBAdapter(config);

      default:
        throw new Error(`Unsupported storage type: ${type}`);
    }
  }

  /**
   * 建立預設的儲存適配器（目前使用 LocalStorage）
   * @param config 儲存配置
   * @returns StorageAdapter 實例
   */
  static createDefaultStorage(config?: StorageConfig): StorageAdapter {
    return this.createStorage(StorageType.LOCAL_STORAGE, config);
  }
}
