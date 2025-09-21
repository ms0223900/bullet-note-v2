# 測試文件 (Testing Documentation)

## 概述 (Overview)

本專案使用 Jest 和 React Testing Library 作為主要的測試工具，提供完整的測試解決方案。

## 已安裝的工具 (Installed Tools)

### 核心測試框架
- **Jest**: 主要測試框架
- **jest-environment-jsdom**: 提供模擬 DOM 環境
- **@testing-library/react**: React 組件測試工具
- **@testing-library/jest-dom**: 提供額外的 Jest 匹配器
- **@testing-library/user-event**: 模擬用戶互動

## 測試腳本 (Test Scripts)

```bash
# 運行所有測試
npm test

# 監視模式 (開發時使用)
npm run test:watch

# 生成覆蓋率報告
npm run test:coverage

# CI 環境測試
npm run test:ci
```

## 測試結構 (Test Structure)

```
src/
├── __tests__/           # 測試檔案目錄
│   ├── note-editor.test.tsx
│   ├── symbol-insertion-button.test.tsx
│   ├── utils.test.ts
│   └── integration.test.tsx
└── components/          # 組件檔案
    └── ...
```

## 配置檔案 (Configuration Files)

### jest.config.js
- 主要的 Jest 配置檔案
- 整合 Next.js 和 TypeScript
- 設定模組路徑別名 (@/ 映射到 src/)
- 配置覆蓋率閾值

### jest.setup.js
- Jest 設定檔案
- 導入 @testing-library/jest-dom
- Mock Next.js 組件 (router, navigation)
- Mock 第三方庫 (framer-motion, Chakra UI)

## 測試覆蓋率 (Test Coverage)

當前測試覆蓋率：
- **Components/Notes**: 97%+ 覆蓋率
- **Utils**: 部分覆蓋
- **整體覆蓋率**: 約 57%

### 覆蓋率目標
- 語句 (Statements): 70%
- 分支 (Branches): 70%
- 函數 (Functions): 70%
- 行數 (Lines): 70%

## 測試範例 (Test Examples)

### 組件測試
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SymbolInsertionButton } from '@/components/notes/symbol-insertion-button'

describe('SymbolInsertionButton', () => {
  it('should call onSymbolInsert when button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnSymbolInsert = jest.fn()
    
    render(<SymbolInsertionButton onSymbolInsert={mockOnSymbolInsert} />)
    
    const bulletButton = screen.getByText('•')
    await user.click(bulletButton)
    
    expect(mockOnSymbolInsert).toHaveBeenCalledWith('•')
  })
})
```

### 工具函數測試
```typescript
import { cn } from '@/lib/utils'

describe('Utils', () => {
  it('should merge class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })
})
```

## 最佳實踐 (Best Practices)

### 測試命名
- 使用描述性的測試名稱
- 遵循 "should + 動作 + 期望結果" 格式
- 使用中英文混合描述更清楚的期望

### 測試結構
- **Arrange**: 設定測試資料和環境
- **Act**: 執行要測試的動作
- **Assert**: 驗證結果

### Mock 策略
- Mock 外部依賴 (API、第三方庫)
- 使用 jest.fn() 建立 mock 函數
- 在 beforeEach 中清理 mock

## 測試類型 (Test Types)

### 1. 單元測試 (Unit Tests)
- 測試個別組件和函數
- 快速執行，提供即時回饋
- 涵蓋大部分測試案例

### 2. 整合測試 (Integration Tests)
- 測試組件間的互動
- 驗證資料流和事件處理
- 確保組件協同工作

### 3. 用戶互動測試
- 使用 @testing-library/user-event
- 模擬真實的用戶行為
- 測試鍵盤、滑鼠事件

## 故障排除 (Troubleshooting)

### 常見問題
1. **模組路徑解析問題**: 確認 jest.config.js 中的 moduleNameMapper 設定
2. **DOM 相關錯誤**: 確認使用 jsdom 環境
3. **異步測試問題**: 使用 async/await 和適當的等待方法

### 調試技巧
- 使用 `screen.debug()` 檢查渲染的 DOM
- 使用 `console.log()` 輸出測試中的資料
- 檢查 Jest 錯誤訊息的詳細資訊

## 持續改進 (Continuous Improvement)

### 下一步計劃
1. 增加更多組件測試
2. 提高測試覆蓋率到 80% 以上
3. 添加 E2E 測試 (Playwright)
4. 實施視覺回歸測試

### 測試策略
- 遵循測試金字塔原則
- 單元測試 (70%) > 整合測試 (20%) > E2E 測試 (10%)
- 專注於用戶行為和業務邏輯
