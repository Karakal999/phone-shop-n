import { api, ApiResponse } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  salePrice?: number;
  createdAt: string;
}

export interface ProductFilters {
  [key: string]: unknown;
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

class ProductService {
  private readonly baseEndpoint = '/products';

  async getProducts(filters?: ProductFilters): Promise<ApiResponse<ProductsResponse>> {
    return api.get<ProductsResponse>(this.baseEndpoint, filters);
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return api.get<Product>(`${this.baseEndpoint}/${id}`);
  }

  async getNewArrivals(limit = 8): Promise<ApiResponse<Product[]>> {
    return api.get<Product[]>(`${this.baseEndpoint}/new`, { limit });
  }

  async getSaleItems(limit = 8): Promise<ApiResponse<Product[]>> {
    return api.get<Product[]>(`${this.baseEndpoint}/sale`, { limit });
  }

  async getByCategory(category: string, filters?: Omit<ProductFilters, 'category'>): Promise<ApiResponse<ProductsResponse>> {
    return api.get<ProductsResponse>(`${this.baseEndpoint}/category/${category}`, filters);
  }

  clearProductCache(): void {
    api.clearCacheByEndpoint(this.baseEndpoint);
  }
}

export const productService = new ProductService(); 