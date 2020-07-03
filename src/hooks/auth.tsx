import React, { createContext, useCallback, useState, useContext } from 'react';
import { decode } from 'jsonwebtoken';
import { isAfter } from 'date-fns';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface TokenPayload {
  exp: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  isProvider: number;
  created_at: Date;
  updated_at: Date;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AppointmentsCro:token');
    const user = localStorage.getItem('@AppointmentsCro:user');

    if (token) {
      const decoded = decode(token as string);

      const { exp } = decoded as TokenPayload;

      if (!isAfter(exp * 1000, Date.now())) {
        localStorage.removeItem('@AppointmentsCro:token');
        localStorage.removeItem('@AppointmentsCro:user');
      }
    }

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@AppointmentsCro:token', token);
    localStorage.setItem('@AppointmentsCro:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AppointmentsCro:token');
    localStorage.removeItem('@AppointmentsCro:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user as UserData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
