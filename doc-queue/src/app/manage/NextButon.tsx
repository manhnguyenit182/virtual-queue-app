"use client"

import { Button } from '@heroui/react';
import { db } from '@/lib/firebase';
import { ref, runTransaction, get, set } from 'firebase/database';
import { ChevronRight, UserCheck } from 'lucide-react';
import { useState } from 'react';

type QueueItem = {
    name: string;
    phone: string;
    timestamp: number;
    status: string;
}

export default function NextButton({ children, currentNumber, data }: { children: React.ReactNode, currentNumber: number, data: QueueItem[] }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = async () => {
        // Logic to handle the next button click

        setIsLoading(true);
        try {
            const queueRef = ref(db, '/queue');
            const currentRef = ref(db, '/current');

            await runTransaction(currentRef, (prev: number | null) => {
                console.log("Previous:", prev);
                return (prev !== null ? prev + 1 : 1);
            });

            get(queueRef).then((snapshot) => {
                const data = snapshot.val();
                if (data && data[currentNumber]) {
                    const statusRef = ref(db, `/queue/${currentNumber}/status`);
                    set(statusRef, "completed");
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = currentNumber >= data.length;

    return (
        <Button
            onPress={handleNext}
            color="primary"
            variant="shadow"
            size="lg"
            isLoading={isLoading}
            isDisabled={isDisabled}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            startContent={!isLoading && <UserCheck className="w-5 h-5" />}
            endContent={!isLoading && <ChevronRight className="w-4 h-4" />}
        >
            {isLoading ? "Processing..." : children}
        </Button>
    );
}