'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTheme } from '@/contexts/ThemeContext';
import { FileText, Plus, Search, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen ${themeConfig.background.primary} relative`}>
      <Header />
      <ThemeImage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className={`text-4xl font-bold mb-4 ${themeConfig.noteItem.note.text}`}
            >
              歡迎使用 Bullet Note v2
            </h1>
            <p
              className={`text-lg mb-8 ${themeConfig.noteItem.note.text} opacity-80`}
            >
              一個現代化的筆記應用程式，使用 Next.js 15、TypeScript 和 Tailwind
              CSS 建構
            </p>
            <Link href="/notes">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                建立新筆記
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className={`p-6 border rounded-lg ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border}`}
            >
              <FileText
                className={`h-8 w-8 mb-4 ${themeConfig.noteItem.note.icon}`}
              />
              <h3
                className={`text-lg font-semibold mb-2 ${themeConfig.noteItem.note.text}`}
              >
                快速筆記
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-70`}>
                快速建立和編輯筆記，支援 Markdown 格式
              </p>
            </div>
            <div
              className={`p-6 border rounded-lg ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border}`}
            >
              <Search
                className={`h-8 w-8 mb-4 ${themeConfig.noteItem.note.icon}`}
              />
              <h3
                className={`text-lg font-semibold mb-2 ${themeConfig.noteItem.note.text}`}
              >
                智能搜尋
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-70`}>
                強大的搜尋功能，快速找到您需要的筆記
              </p>
            </div>
            <div
              className={`p-6 border rounded-lg ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border}`}
            >
              <Settings
                className={`h-8 w-8 mb-4 ${themeConfig.noteItem.note.icon}`}
              />
              <h3
                className={`text-lg font-semibold mb-2 ${themeConfig.noteItem.note.text}`}
              >
                個人化設定
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-70`}>
                自訂主題、字體大小和其他個人偏好設定
              </p>
            </div>
          </div>

          <div
            className={`${themeConfig.background.secondary} rounded-lg p-8 text-center`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${themeConfig.noteItem.note.text}`}
            >
              開始使用
            </h2>
            <p className={`mb-6 ${themeConfig.noteItem.note.text} opacity-70`}>
              專案已經配置完成，包含以下技術棧：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div
                className={`${themeConfig.noteItem.note.background} p-3 rounded border ${themeConfig.noteItem.note.border}`}
              >
                <strong className={themeConfig.noteItem.note.text}>
                  Next.js 15
                </strong>
                <br />
                <span
                  className={`${themeConfig.noteItem.note.text} opacity-70`}
                >
                  React 框架
                </span>
              </div>
              <div
                className={`${themeConfig.noteItem.note.background} p-3 rounded border ${themeConfig.noteItem.note.border}`}
              >
                <strong className={themeConfig.noteItem.note.text}>
                  TypeScript
                </strong>
                <br />
                <span
                  className={`${themeConfig.noteItem.note.text} opacity-70`}
                >
                  類型安全
                </span>
              </div>
              <div
                className={`${themeConfig.noteItem.note.background} p-3 rounded border ${themeConfig.noteItem.note.border}`}
              >
                <strong className={themeConfig.noteItem.note.text}>
                  Tailwind CSS
                </strong>
                <br />
                <span
                  className={`${themeConfig.noteItem.note.text} opacity-70`}
                >
                  樣式框架
                </span>
              </div>
              <div
                className={`${themeConfig.noteItem.note.background} p-3 rounded border ${themeConfig.noteItem.note.border}`}
              >
                <strong className={themeConfig.noteItem.note.text}>
                  ESLint + Prettier
                </strong>
                <br />
                <span
                  className={`${themeConfig.noteItem.note.text} opacity-70`}
                >
                  代碼品質
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
