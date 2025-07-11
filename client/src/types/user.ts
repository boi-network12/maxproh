import { AuthUser } from "./auth";

export interface User extends AuthUser {
  lastLogin?: string;
  createdAt: string;
}

export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UpdateUserRole {
  userId: string;
  role?: 'user' | 'admin' | 'influencer';
  isActive?: boolean;
}