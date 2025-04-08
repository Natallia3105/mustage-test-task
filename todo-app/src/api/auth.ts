import { Todo } from 'src/models/todo';
import { API_URL, JWT_TOKEN_KEY_NAME } from '../constants';

export interface AuthResponse {
  data: {
    access_token: string;
  };
}

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  password: string;
} & SignInPayload;

export const signIn = async (data: SignInPayload): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const result: AuthResponse = await response.json();

  localStorage.setItem(JWT_TOKEN_KEY_NAME, result.data.access_token);
};

export const signUp = async (payload: SignUpPayload): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const result: AuthResponse = await response.json();
  localStorage.setItem(JWT_TOKEN_KEY_NAME, result.data.access_token);
};

export const signOut = () => {
  localStorage.removeItem(JWT_TOKEN_KEY_NAME);
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem(JWT_TOKEN_KEY_NAME);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
