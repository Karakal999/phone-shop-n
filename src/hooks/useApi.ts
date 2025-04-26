import { useState, useCallback } from 'react';
import { ApiError } from '../services/api';

interface UseApiResponse<T, P extends unknown[]> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
  execute: (...args: P) => Promise<T>;
  clearError: () => void;
}

export function useApi<T, P extends unknown[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    loadingDelay?: number;
  } = {}
): UseApiResponse<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onSuccess, onError, loadingDelay = 0 } = options;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const execute = useCallback(
    async (...args: P): Promise<T> => {
      let loadingTimeout: ReturnType<typeof setTimeout> | null = null;

      try {
        // Set loading after a delay to prevent flashing for quick responses
        if (loadingDelay > 0) {
          loadingTimeout = setTimeout(() => setIsLoading(true), loadingDelay);
        } else {
          setIsLoading(true);
        }

        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        onError?.(apiError);
        throw apiError;
      } finally {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
        setIsLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, loadingDelay]
  );

  return {
    data,
    error,
    isLoading,
    execute,
    clearError,
  };
}

// Example usage:
/*
interface Product {
  id: number;
  name: string;
  price: number;
}

interface GetProductsParams {
  category: string;
}

const MyComponent = () => {
  const { data, error, isLoading, execute } = useApi<Product[], [GetProductsParams]>(
    productService.getProducts,
    {
      onSuccess: (data) => console.log('Success:', data),
      onError: (error) => console.error('Error:', error),
      loadingDelay: 300 // Show loading state only if request takes more than 300ms
    }
  );

  useEffect(() => {
    execute({ category: 'phones' });
  }, [execute]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  return <ProductList products={data} />;
};
*/ 