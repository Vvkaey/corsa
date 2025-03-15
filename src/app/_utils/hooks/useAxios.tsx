import { useEffect } from 'react';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { useAuth } from './useAuth';
import { getStoredToken } from '../../_utils/storage';

/**
 * `useAxios` is a custom hook that configures Axios with authentication handling.
 * 
 * - It adds a request interceptor to attach the authentication token to requests.
 * - It adds a response interceptor to handle 401 errors by logging out the user.
 * - It automatically cleans up interceptors when the component using the hook unmounts.
 *
 * @returns {AxiosInstance} An Axios instance with configured interceptors.
 *
 * @example
 * ```tsx
 * import { useAxios } from '../hooks/useAxios';
 * 
 * const axiosInstance = useAxios();
 * 
 * axiosInstance.get('/api/data')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 * ```
 */
export const useAxios = (): AxiosInstance => {
  const { logout } = useAuth();

  useEffect(() => {
    /**
     * Axios request interceptor to attach the authentication token to outgoing requests.
     * If a token is found in local storage, it adds it to the `Authorization` header.
     */
    const requestInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = getStoredToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: Error) => Promise.reject(error)
    );

    /**
     * Axios response interceptor to handle authentication errors.
     * If the API returns a 401 (Unauthorized) error, it triggers a logout.
     */
    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<never> => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup: Eject interceptors when the component using this hook unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return axios;
};
