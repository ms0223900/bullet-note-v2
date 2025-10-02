'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTheme } from '@/contexts/ThemeContext';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Shield,
  Smartphone,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { themeConfig } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 產品截圖輪播
  const productScreenshots = [
    '/images/bujo-simple-theme-penguin.webp',
    '/images/bujo-colorful-theme-penguin.webp',
    '/images/bujo-glass-theme-penguin.webp',
  ];

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productScreenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productScreenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productScreenshots.length) % productScreenshots.length);
  };

  return (
    <div className={`min-h-screen ${themeConfig.background.primary} relative overflow-hidden`}>
      <Header />
      <ThemeImage />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${themeConfig.noteItem.note.text}`}>
                重新定義
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  筆記體驗
                </span>
              </h1>
              <p className={`text-xl md:text-2xl ${themeConfig.noteItem.note.text} opacity-80 max-w-2xl mx-auto lg:mx-0`}>
                現代化的 Bullet Journal 應用程式，結合簡約設計與強大功能，讓您的想法井然有序
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/notes">
                <Button
                  size="lg"
                  className={`gap-3 text-lg px-8 py-4 ${themeConfig.button.primary}`}
                  data-gtm-label="hero-cta"
                >
                  <Plus className="h-6 w-6" />
                  立即開始
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className={`gap-3 text-lg px-8 py-4 ${themeConfig.button.secondary}`}
              >
                <Smartphone className="h-6 w-6" />
                查看示範
              </Button>
            </div>

            {/* 統計數據 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <div className={`text-3xl font-bold ${themeConfig.noteItem.note.text}`}>10K+</div>
                <div className={`text-sm ${themeConfig.noteItem.note.text} opacity-70`}>活躍用戶</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${themeConfig.noteItem.note.text}`}>50K+</div>
                <div className={`text-sm ${themeConfig.noteItem.note.text} opacity-70`}>筆記總數</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${themeConfig.noteItem.note.text}`}>4.9</div>
                <div className={`text-sm ${themeConfig.noteItem.note.text} opacity-70`}>用戶評分</div>
              </div>
            </div>
          </div>

          {/* 產品截圖展示 */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={productScreenshots[currentSlide]}
                  alt={`產品截圖 ${currentSlide + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* 輪播控制 */}
              <button
                onClick={prevSlide}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${themeConfig.button.secondary} backdrop-blur-sm`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${themeConfig.button.secondary} backdrop-blur-sm`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* 指示器 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productScreenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${themeConfig.noteItem.note.text}`}>
              為什麼選擇 Bullet Note v2？
            </h2>
            <p className={`text-xl ${themeConfig.noteItem.note.text} opacity-80 max-w-3xl mx-auto`}>
              我們專注於提供最佳的筆記體驗，結合現代設計與實用功能
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 功能 1 */}
            <div className={`p-8 rounded-2xl ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border} hover:scale-105 transition-transform duration-300`}>
              <div className={`w-16 h-16 rounded-xl ${themeConfig.background.accent} flex items-center justify-center mb-6`}>
                <Zap className={`h-8 w-8 ${themeConfig.noteItem.note.iconColor}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${themeConfig.noteItem.note.text}`}>
                極速響應
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-80 leading-relaxed`}>
                基於 Next.js 15 和 Turbopack 建構，提供閃電般的載入速度，讓您的筆記體驗流暢無比
              </p>
            </div>

            {/* 功能 2 */}
            <div className={`p-8 rounded-2xl ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border} hover:scale-105 transition-transform duration-300`}>
              <div className={`w-16 h-16 rounded-xl ${themeConfig.background.accent} flex items-center justify-center mb-6`}>
                <Shield className={`h-8 w-8 ${themeConfig.noteItem.note.iconColor}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${themeConfig.noteItem.note.text}`}>
                資料安全
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-80 leading-relaxed`}>
                所有資料本地儲存，完全掌控您的隱私。支援多種備份方式，確保資料永不遺失
              </p>
            </div>

            {/* 功能 3 */}
            <div className={`p-8 rounded-2xl ${themeConfig.noteItem.note.background} ${themeConfig.noteItem.note.border} hover:scale-105 transition-transform duration-300`}>
              <div className={`w-16 h-16 rounded-xl ${themeConfig.background.accent} flex items-center justify-center mb-6`}>
                <Settings className={`h-8 w-8 ${themeConfig.noteItem.note.iconColor}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${themeConfig.noteItem.note.text}`}>
                個人化主題
              </h3>
              <p className={`${themeConfig.noteItem.note.text} opacity-80 leading-relaxed`}>
                三種精心設計的主題：簡約、繽紛、iOS 風格，讓您找到最適合的視覺體驗
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${themeConfig.noteItem.note.text}`}>
              產品展示
            </h2>
            <p className={`text-xl ${themeConfig.noteItem.note.text} opacity-80 max-w-3xl mx-auto`}>
              探索不同主題下的 Bullet Note v2 介面設計
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productScreenshots.map((screenshot, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={screenshot}
                    alt={`主題展示 ${index + 1}`}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`text-white font-semibold text-lg mb-2`}>
                        {index === 0 ? '簡約主題' : index === 1 ? '繽紛主題' : 'iOS 風格'}
                      </h3>
                      <p className={`text-white/90 text-sm`}>
                        {index === 0 ? '簡潔線條，專注內容' : index === 1 ? '活潑色彩，生動體驗' : '現代玻璃，優雅質感'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${themeConfig.background.secondary} rounded-3xl p-12 md:p-16`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${themeConfig.noteItem.note.text}`}>
              準備好開始了嗎？
            </h2>
            <p className={`text-xl mb-8 ${themeConfig.noteItem.note.text} opacity-80 max-w-2xl mx-auto`}>
              加入數千名用戶的行列，體驗現代化的筆記應用程式。完全免費，立即開始使用。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/notes">
                <Button
                  size="lg"
                  className={`gap-3 text-lg px-8 py-4 ${themeConfig.button.primary}`}
                  data-gtm-label="final-cta"
                >
                  <Plus className="h-6 w-6" />
                  立即開始使用
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className={`gap-3 text-lg px-8 py-4 ${themeConfig.button.secondary}`}
              >
                <Users className="h-6 w-6" />
                了解更多
              </Button>
            </div>

            {/* 特色列表 */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className={`h-5 w-5 ${themeConfig.noteItem.note.iconColor}`} />
                <span className={`${themeConfig.noteItem.note.text}`}>完全免費使用</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className={`h-5 w-5 ${themeConfig.noteItem.note.iconColor}`} />
                <span className={`${themeConfig.noteItem.note.text}`}>無需註冊</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className={`h-5 w-5 ${themeConfig.noteItem.note.iconColor}`} />
                <span className={`${themeConfig.noteItem.note.text}`}>即時同步</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
