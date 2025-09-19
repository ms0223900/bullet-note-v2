import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Search, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">歡迎使用 Bullet Note v2</h1>
            <p className="text-lg text-muted-foreground mb-8">
              一個現代化的筆記應用程式，使用 Next.js 15、TypeScript 和 Tailwind
              CSS 建構
            </p>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              建立新筆記
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border rounded-lg bg-card">
              <FileText className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">快速筆記</h3>
              <p className="text-muted-foreground">
                快速建立和編輯筆記，支援 Markdown 格式
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <Search className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">智能搜尋</h3>
              <p className="text-muted-foreground">
                強大的搜尋功能，快速找到您需要的筆記
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <Settings className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">個人化設定</h3>
              <p className="text-muted-foreground">
                自訂主題、字體大小和其他個人偏好設定
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">開始使用</h2>
            <p className="text-muted-foreground mb-6">
              專案已經配置完成，包含以下技術棧：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-background p-3 rounded border">
                <strong>Next.js 15</strong>
                <br />
                React 框架
              </div>
              <div className="bg-background p-3 rounded border">
                <strong>TypeScript</strong>
                <br />
                類型安全
              </div>
              <div className="bg-background p-3 rounded border">
                <strong>Tailwind CSS</strong>
                <br />
                樣式框架
              </div>
              <div className="bg-background p-3 rounded border">
                <strong>ESLint + Prettier</strong>
                <br />
                代碼品質
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
