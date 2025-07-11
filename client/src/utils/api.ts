import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { User, UpdateUserProfile, UpdateUserRole } from '../types/user';
import { API_URL } from '../config/apiConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data;
};

export const getUserProfile = async (token: string): Promise<User> => {
  const response = await api.get<User>('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfile = async (data: UpdateUserProfile, token: string): Promise<User> => {
  const response = await api.put<User>('/users/profile', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserRole = async (data: UpdateUserRole, token: string): Promise<User> => {
  const response = await api.put<User>('/users/role', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};