"use client"

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Chip } from '@heroui/react';
import { ref, onValue } from 'firebase/database';
import NextButton from './NextButon';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Search, BriefcaseMedical, LogOut, Users, Clock, Phone, CircleAlert } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
type QueueItem = {
    name: string;
    phone: string;
    timestamp: number;
    status: string;
}


export default function Manage() {
    const [data, setData] = useState<QueueItem[]>([]);
    const [current, setCurrent] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const { logout } = useFirebaseAuth();

    useEffect(() => {
        const dbRef = ref(db, '/queue');
        const currentRef = ref(db, '/current');

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                setData(data);
            } else {
                setData([]);
            }
        });

        onValue(currentRef, (snapshot) => {
            const current = snapshot.val();
            setCurrent(current);
        });

    }, []);

    useEffect(() => {
        if (current !== null) {
            const currentRow = document.getElementById(`row-${current}`);
            if (currentRow) {
                currentRow.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

            }
        }
    }, [current]);

    const getStatusChip = (status: string) => {
        const statusConfig = {
            waiting: { color: "warning" as const, variant: "dot" as const },
            serving: { color: "default" as const, variant: "dot" as const },
            completed: { color: "success" as const, variant: "dot" as const },
            cancelled: { color: "danger" as const, variant: "dot" as const }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.waiting;

        return (
            <Chip color={config.color} variant={config.variant} size="sm">
                {status}
            </Chip>
        );
    };

    const filteredData = data
        .map((item: QueueItem, index: number) => ({ ...item, index }))
        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <div className="relative bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20">
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-75 animate-pulse"></div>
                            <div className="relative p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                                <BriefcaseMedical className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Queue Management
                            </h1>
                            <p className="text-sm text-gray-600 font-medium">Healthcare Center • Digital Queue System</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Stats Cards */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Bệnh nhân hiện tại</p>
                                        <p className="text-lg font-bold text-gray-900">#{current ?? 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-indigo-600" />
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Tổng số trong hàng chờ</p>
                                        <p className="text-lg font-bold text-gray-900">{data.length - 1 || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="relative px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <Input
                            isClearable
                            value={search}
                            onValueChange={setSearch}
                            classNames={{
                                base: "w-full",
                                inputWrapper: "bg-white/80 backdrop-blur-md border-white/30 shadow-lg hover:shadow-xl transition-all duration-300",
                                input: "text-gray-900 placeholder:text-gray-500",
                            }}
                            placeholder="tìm bệnh nhân theo tên..."
                            size="lg"
                            startContent={<Search className="w-5 h-5 text-gray-400" />}
                            variant="bordered"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl -z-10 blur-sm"></div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30">
                            <p className="text-sm text-gray-600 font-medium">
                                Hiển thị <span className="text-blue-600 font-bold">{filteredData.length}</span> trên tổng <span className="text-indigo-600 font-bold">{data.length - 1}</span> bệnh nhân
                            </p>
                        </div>
                        <NextButton currentNumber={current ?? 0} data={data}>
                            Next Patient
                        </NextButton>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="relative px-6 pb-8">
                {/* Glassmorphism Container */}
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>

                    <Table
                        isHeaderSticky
                        aria-label="Queue Management Table"
                        className="w-full relative z-10"
                        classNames={{
                            wrapper: "p-0 shadow-none max-h-[65vh] overflow-auto bg-transparent",
                            th: "bg-gradient-to-r from-slate-100/80 to-gray-100/80 backdrop-blur-sm text-gray-800 font-bold border-b-2 border-gray-200/50 first:rounded-tl-2xl last:rounded-tr-2xl",
                            td: "border-b border-gray-200/30 backdrop-blur-sm",
                            table: "bg-transparent"
                        }}
                    >
                        <TableHeader>
                            <TableColumn className="w-20 text-center px-6">
                                <div className="flex items-center justify-start pl-1.5">
                                    <span className="text-sm font-bold">STT</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="w-1/4">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-600" />
                                    <span className="font-bold">Tên bệnh nhân</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="w-1/5">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span className="font-bold">Số điện thoại</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="w-1/4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-indigo-600" />
                                    <span className="font-bold">Thời gian đến   </span>
                                </div>
                            </TableColumn>
                            <TableColumn className="w-1/6">
                                <div className="flex items-center justify-center gap-2">
                                    <CircleAlert className="w-4 h-4 text-indigo-600" />
                                    <span className="font-bold">Trạng thái</span>
                                </div>
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow
                                    key={item.index}
                                    id={`row-${item.index}`}
                                    className={current === item.index
                                        ? "bg-gradient-to-r from-blue-100/50 via-cyan-50/50 to-indigo-100/50 backdrop-blur-sm border-l-4 border-blue-500 transform transition-all duration-500 scale-[1.02] shadow-lg"
                                        : "hover:bg-white/60 hover:backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                                    }
                                >
                                    <TableCell className="text-center px-6">
                                        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${current === item.index
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-110"
                                            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-cyan-100"
                                            }`}>
                                            {current === item.index && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping opacity-30"></div>
                                            )}
                                            <span className="relative z-10">{item.index}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`font-semibold transition-colors ${current === item.index ? "text-blue-900" : "text-gray-900"}`}>
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`font-mono transition-colors ${current === item.index ? "text-blue-700" : "text-gray-600"}`}>
                                            {item.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`transition-colors ${current === item.index ? "text-blue-700 font-medium" : "text-gray-600"}`}>
                                            {dayjs(item.timestamp).format('MMM DD, YYYY HH:mm')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getStatusChip(item.status)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">Không tìm thấy bệnh nhân</p>
                            <p className="text-gray-400 text-sm">Hãy thử thay đổi điều kiện tìm kiếm</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}