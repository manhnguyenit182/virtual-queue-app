'use client';

import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardBody, Form } from '@heroui/react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useAuth } from '@/contexts/AuthContext';
import Screen from '@/app/screen/page';
export default function LoginForm({ children }: { children?: React.ReactNode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const { signIn, signUp, loading, error } = useFirebaseAuth();
    const { user } = useAuth();

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

    if (user) {
        return (
            <Screen />
        );
    }

    return (
        <Card className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mt-6">Doctor Queue Web</h1>
            <CardHeader>
                {/* <h2 className="text-lg font-semibold">
                    Đăng Nhập
                </h2> */}
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        isLoading={loading}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
}
