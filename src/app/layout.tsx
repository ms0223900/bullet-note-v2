import { GTMScript, GTagScript } from '@/components/analytics';
import { GTM_CONFIG } from '@/constants/gtm';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bullet Note v2',
  description: 'A modern note-taking application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONFIG.ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GTMScript />
        <GTagScript />
        <ThemeProvider>
          <ViewModeProvider>{children}</ViewModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
