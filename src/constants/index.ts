// 應用程式常數
export const APP_NAME = 'Bullet Note v2';
export const APP_DESCRIPTION =
  'A modern note-taking application built with Next.js';

// API 端點
export const API_ENDPOINTS = {
  NOTES: '/api/notes',
  USERS: '/api/users',
  AUTH: '/api/auth',
} as const;

// 本地儲存鍵值
export const STORAGE_KEYS = {
  THEME: 'bullet-note-theme',
  USER_PREFERENCES: 'bullet-note-preferences',
  DRAFT_NOTES: 'bullet-note-drafts',
} as const;

// 主題選項
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// 筆記狀態
export const NOTE_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

// 匯出主題相關常數
export * from './themes';

// 匯出 GTM 相關常數
export * from './gtm';
