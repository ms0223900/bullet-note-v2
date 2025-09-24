// 子彈筆記規則（用於顯示用途，可隨版本彈性調整）

export type BulletRule = {
    symbol: string;
    meaningZh: string; // 中文意義
    meaningEn?: string; // 英文意義（可選）
};

// 注意：此處的符號僅用於「規則說明的顯示」，
// 不等同於實際解析邏輯（見 `src/lib/bullet-symbols.ts`）。
export const BULLET_RULES: BulletRule[] = [
    { symbol: '・', meaningZh: '任務 Tasks', meaningEn: 'Tasks' },
    { symbol: '。', meaningZh: '活動 Events', meaningEn: 'Events' },
    { symbol: '－', meaningZh: '筆記 Notes / 靈感／想法', meaningEn: 'Notes / Ideas' },
];

// 方便未來擴充：例如用版本 key 管理不同規則集
export const BULLET_RULES_BY_VERSION: Record<string, BulletRule[]> = {
    current: BULLET_RULES,
};

export function getBulletRules(version: string = 'current'): BulletRule[] {
    return BULLET_RULES_BY_VERSION[version] ?? BULLET_RULES;
}


