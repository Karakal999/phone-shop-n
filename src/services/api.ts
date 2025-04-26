import axios, { AxiosError, AxiosInstance } from 'axios';

// Create API types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface ErrorResponseData {
  message?: string;
  code?: string;
}

class ApiService {
  private api: AxiosInstance;
  private cache: Map<string, CacheEntry<unknown>>;
  private cacheTimeout: number;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize cache
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache timeout

    // Add request interceptor for auth
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(this.handleError(error))
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error))
    );
  }

  private handleError(error: AxiosError<ErrorResponseData>): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'Помилка сервера',
        status: error.response.status,
        code: error.response.data?.code,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Немає відповіді від сервера',
        code: 'NO_RESPONSE',
      };
    } else {
      // Request setup error
      return {
        message: 'Помилка запиту',
        code: 'REQUEST_ERROR',
      };
    }
  }

  private getCacheKey(endpoint: string, params?: Record<string, unknown>): string {
    return `${endpoint}${params ? JSON.stringify(params) : ''}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  private setCacheData<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  private getCacheData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data as T;
    }
    this.cache.delete(key);
    return null;
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>, useCache = true): Promise<ApiResponse<T>> {
    const cacheKey = this.getCacheKey(endpoint, params);
    
    if (useCache) {
      const cachedData = this.getCacheData<T>(cacheKey);
      if (cachedData) {
        return { data: cachedData, status: 200 };
      }
    }

    const response = await this.api.get<T>(endpoint, { params });
    if (useCache) {
      this.setCacheData(cacheKey, response.data);
    }
    return { data: response.data, status: response.status };
  }

  async post<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    const response = await this.api.post<T>(endpoint, data);
    return { data: response.data, status: response.status };
  }

  async put<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    const response = await this.api.put<T>(endpoint, data);
    return { data: response.data, status: response.status };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<T>(endpoint);
    return { data: response.data, status: response.status };
  }

  clearCache(): void {
    this.cache.clear();
  }

  clearCacheByEndpoint(endpoint: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(endpoint)) {
        this.cache.delete(key);
      }
    }
  }
}

export const api = new ApiService(); 