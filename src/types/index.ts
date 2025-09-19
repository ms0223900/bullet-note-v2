// 通用類型定義
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// 筆記相關類型
export interface Note extends BaseEntity {
    title: string;
    content: string;
    tags: string[];
    isPinned: boolean;
    isArchived: boolean;
}

// 用戶相關類型
export interface User extends BaseEntity {
    name: string;
    email: string;
    avatar?: string;
}

// API 響應類型
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// 分頁類型
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
