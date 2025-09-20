# Bullet Note v2

一個現代化的筆記應用程式，使用 Next.js 15、TypeScript 和 Tailwind CSS 建構。

## 🚀 技術棧

- **Next.js 15** - React 全端框架
- **TypeScript** - 類型安全的 JavaScript
- **Tailwind CSS** - 實用優先的 CSS 框架
- **ESLint + Prettier** - 代碼品質和格式化
- **Lucide React** - 現代化的圖標庫
- **Class Variance Authority** - 組件變體管理

## 📁 專案結構

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 全域樣式
│   ├── layout.tsx      # 根佈局
│   └── page.tsx        # 首頁
├── components/         # React 組件
│   ├── ui/            # 基礎 UI 組件
│   └── layout/        # 佈局組件
├── lib/               # 工具函數
├── types/             # TypeScript 類型定義
└── constants/         # 應用程式常數
```

## 🛠️ 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start

# 代碼檢查
npm run lint

# 自動修復代碼問題
npm run lint:fix

# 格式化代碼
npm run format

# 檢查代碼格式
npm run format:check

# TypeScript 類型檢查
npm run type-check
```

## 🎨 功能特色

- ✅ 現代化的 UI 設計
- ✅ 響應式佈局
- ✅ 深色/淺色主題支援
- ✅ TypeScript 類型安全
- ✅ ESLint + Prettier 代碼品質
- ✅ 組件化架構
- ✅ 工具函數庫
- ✅ 常數管理

## 🚀 快速開始

1. 克隆專案

```bash
git clone <repository-url>
cd bullet-note-v2
```

2. 安裝依賴

```bash
npm install
```

3. 啟動開發伺服器

```bash
npm run dev
```

4. 在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000)

## 📝 開發指南

### 添加新組件

1. 在 `src/components/` 下建立組件檔案
2. 使用 TypeScript 和 Tailwind CSS
3. 遵循現有的命名慣例

### 添加新頁面

1. 在 `src/app/` 下建立新的路由資料夾
2. 添加 `page.tsx` 檔案
3. 使用 App Router 的檔案系統路由

### 代碼風格

- 使用 ESLint 和 Prettier 保持代碼一致性
- 遵循 TypeScript 最佳實踐
- 使用 Tailwind CSS 進行樣式設計

## 📄 授權

MIT License
