"use client";
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { Users, Clock, Zap, Volume2 } from 'lucide-react';
import dayjs from 'dayjs';
export default function Screen() {
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Sử dụng onValue để lắng nghe thay đổi theo thời gian thực
        const dbRef = ref(db, '/current');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const currentNum = snapshot.val();
                setCurrentNumber(currentNum);
            } else {
                setCurrentNumber(null);
                console.log("No current number available");
            }
        });

        // Cleanup function để hủy listener khi component unmount
        return () => unsubscribe();
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/4 right-20 w-24 h-24 bg-cyan-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 bg-indigo-400/25 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center justify-between px-8 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Healthcare Center</h1>
                            <p className="text-blue-200">Queue Display System</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-white">
                            <Clock className="w-5 h-5 text-blue-300" />
                            <span className="text-lg font-mono">
                                {dayjs(currentTime).format('HH:mm:ss')}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-200 text-sm">
                                {dayjs(currentTime).format('dddd, MMMM DD, YYYY')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8">
                <div className="text-center space-y-8">
                    {/* Title */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Volume2 className="w-8 h-8 text-yellow-400 animate-bounce" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                Now Serving
                            </h1>
                            <Volume2 className="w-8 h-8 text-yellow-400 animate-bounce delay-300" />
                        </div>
                        <p className="text-xl text-blue-200">Please proceed to the counter</p>
                    </div>

                    {/* Current Number Display */}
                    <div className="relative">
                        {currentNumber !== null ? (
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-3xl blur-3xl scale-110 animate-pulse"></div>

                                {/* Main Number Display */}
                                <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
                                    <div className="text-center">
                                        <div className="text-[12rem] md:text-[16rem] font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent leading-none animate-pulse">
                                            {String(currentNumber).padStart(3, '0')}
                                        </div>

                                        {/* Animated Indicators */}
                                        <div className="flex justify-center space-x-4 mt-6">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping delay-100"></div>
                                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Waiting State */}
                                <div className="bg-gray-800/50 backdrop-blur-xl border-2 border-gray-600/30 rounded-3xl p-12 shadow-2xl">
                                    <div className="text-center space-y-6">
                                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center animate-spin">
                                            <Zap className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-bold text-gray-300 mb-2">
                                                Waiting for Next Patient
                                            </h2>
                                            <p className="text-gray-400 text-lg">
                                                Please have a seat and wait for your number
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                </div>
            </div>


        </div>
    );
}
