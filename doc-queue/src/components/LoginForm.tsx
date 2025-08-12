'use client';

import { useState } from 'react';
import { Button, Input, Form } from '@heroui/react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useAuth } from '@/contexts/AuthContext';
import Manage from '@/app/manage/page';
export default function LoginForm({ children }: { children?: React.ReactNode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const { signIn, signUp, loading: authLoading, error } = useFirebaseAuth();
    const { user, loading: userLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    // Show loading spinner while checking auth state
    if (userLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <Manage />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-32 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-20 w-36 h-36 bg-indigo-400/25 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md">
                    {/* Glassmorphism Card */}
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>

                        {/* Header Section */}
                        <div className="relative z-10 text-center pt-12 pb-8 px-8">
                            {/* Logo/Icon */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-75 animate-pulse"></div>
                                <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                                Healthcare Queue
                            </h1>
                            <p className="text-gray-600 font-medium">
                                Digital Queue Management System
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="relative z-10 px-8 pb-12">
                            <Form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <Input
                                        type="email"
                                        label="Email Address"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "bg-white/60 backdrop-blur-sm border-white/40 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-300",
                                            input: "text-gray-900 placeholder:text-gray-500",
                                            label: "text-gray-700 font-medium"
                                        }}
                                        startContent={
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        }
                                    />

                                    <Input
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "bg-white/60 backdrop-blur-sm border-white/40 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-300",
                                            input: "text-gray-900 placeholder:text-gray-500",
                                            label: "text-gray-700 font-medium"
                                        }}
                                        startContent={
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-red-700 text-sm font-medium">{error}</p>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                    isLoading={authLoading}
                                    spinner={
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    }
                                >
                                    {authLoading ? "Đang đăng nhập..." : "Đăng nhập vào hệ thống"}
                                </Button>
                            </Form>

                            {/* Additional Info */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-500 text-sm">
                                    Hệ thống quản lý hàng đợi số hoá
                                </p>
                                <div className="flex items-center justify-center space-x-4 mt-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-gray-500">Hệ thống hoạt động</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="text-xs text-gray-500">Bảo mật</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm">
                            © 2025 Healthcare Center • Queue Management System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
