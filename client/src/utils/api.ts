import axios, { AxiosError } from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { User, UpdateUserProfile, UpdateUserRole } from '../types/user';
import { API_URL } from '../config/apiConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper type for standard API error structure
type ApiErrorResponse = {
  message?: string;
  errors?: { msg: string }[];
};

const extractErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  return (
    axiosError.response?.data?.message ||
    axiosError.response?.data?.errors?.map(err => err.msg).join(', ') ||
    'An unexpected error occurred. Please try again.'
  );
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const getMe = async (token: string): Promise<User> => {
  try {
    const response = await api.get<User>('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateUserProfile = async (data: UpdateUserProfile, token: string): Promise<User> => {
  try {
    const response = await api.put<User>('/users/profile', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateUserRole = async (data: UpdateUserRole, token: string): Promise<User> => {
  try {
    const response = await api.put<User>('/users/role', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const getAllUsers = async (token: string, searchQuery: string = ""): Promise<User[]> => {
  try {
    const response = await api.get<User[]>(`/users/all?search=${encodeURIComponent(searchQuery)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createPricingAPI = async (data: { socialMediaPlatform: string; unitPrice: number; quantity: number}, token: string) => {
   try {
    const response = await api.post('/pricing', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export const getAllPricing = async (token: string) => {
  try {
    const response = await api.get('/pricing', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updatePricingAPI = async (
  id: string,
  data: { socialMediaPlatform?: string; unitPrice?: number; quantity?: number },
  token: string
) => {
  try {
    const response = await api.put(`/pricing/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.pricing;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deletePricingAPI = async (id: string, token: string) => {
  try {
    const response = await api.delete(`/pricing/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};