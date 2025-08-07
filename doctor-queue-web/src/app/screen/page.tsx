"use client";
import { Button } from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { ref, get, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
export default function Screen() {
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);

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


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-800">
            <div className="bg-blue-800  p-20  p- text-center">
                <h1 className="text-5xl font-bold text-indigo-50 mb-4">Số Đang Được Gọi</h1>

                <div>
                    {currentNumber !== null ? (
                        <div className=" flex items-center justify-center font-bold text-white" style={{ fontSize: '16rem', maxHeight: "250px" }}>
                            {currentNumber}
                        </div>
                    ) : (
                        <div className="text-4xl text-gray-500 mb-4">
                            Chưa có số nào được gọi
                        </div>
                    )}
                </div>

                {/* <Button
                    variant="solid"
                    color="primary"
                    onClick={() => {
                        // Refresh data
                        const dbRef = ref(db, '/');
                        get(dbRef).then((snapshot) => {
                            if (snapshot.exists()) {
                                const data = snapshot.val();
                                setCurrentNumber(data.current !== undefined ? data.current : null);
                            }
                        });
                    }}
                    className="px-6 py-3 text-lg"
                >
                    Làm Mới
                </Button> */}
            </div>
        </div>
    );
}
