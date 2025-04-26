import { api, ApiResponse } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly baseEndpoint = '/auth';

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post<AuthResponse>(`${this.baseEndpoint}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post<AuthResponse>(`${this.baseEndpoint}/register`, data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await api.post<void>(`${this.baseEndpoint}/logout`, {});
    } finally {
      localStorage.removeItem('authToken');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return api.get<User>(`${this.baseEndpoint}/me`);
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return api.put<User>(`${this.baseEndpoint}/profile`, data);
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return api.put<void>(`${this.baseEndpoint}/password`, {
      oldPassword,
      newPassword,
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

export const authService = new AuthService(); 