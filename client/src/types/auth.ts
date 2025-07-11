export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  accountBalance: number;
  role: 'user' | 'admin' | 'influencer';
  socialMediaProfiles?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: 'user' | 'admin' | 'influencer';
  socialMediaProfiles?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}