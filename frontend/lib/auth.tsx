"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from './axios';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const loadUser = async () => {
            const token = Cookies.get('token');
            const userData = Cookies.get('user');

            if (token && userData) {
                try {
                    // Verify token validity ? Or trust cookie for now?
                    // Ideally call /api/auth/me but we don't have it implemented yet.
                    // We'll trust the stored user data for now.
                    setUser(JSON.parse(userData));
                } catch (e) {
                    console.error("Failed to parse user data", e);
                    logout();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 1 }); // 1 day
        Cookies.set('user', JSON.stringify(userData), { expires: 1 });
        setUser(userData);
        router.push('/dashboard');
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        router.push('/login');
    };

    // Protect routes
    useEffect(() => {
        if (!loading && !user && pathname.startsWith('/dashboard')) {
            router.push('/login');
        }
        if (!loading && user && (pathname === '/login' || pathname === '/register')) {
            router.push('/dashboard');
        }
    }, [user, loading, pathname, router]);


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
