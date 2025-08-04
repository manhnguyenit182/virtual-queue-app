import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import FirebaseService, { QueueItem } from '../services/FirebaseService';

interface QueueListProps {
    isAdmin?: boolean;
}

const QueueList: React.FC<QueueListProps> = ({ isAdmin = false }) => {
    const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FirebaseService.subscribeToQueue((items) => {
            setQueueItems(items);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleCallNext = async (item: QueueItem) => {
        try {
            await FirebaseService.updateQueueItemStatus(item.id, 'called');
            Alert.alert('Thông báo', `Đã gọi ${item.name}`);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái');
        }
    };

    const handleServed = async (item: QueueItem) => {
        try {
            await FirebaseService.updateQueueItemStatus(item.id, 'served');
            Alert.alert('Thông báo', `${item.name} đã được phục vụ`);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái');
        }
    };

    const handleRemove = async (item: QueueItem) => {
        Alert.alert(
            'Xác nhận',
            `Bạn có chắc muốn xóa ${item.name} khỏi hàng đợi?`,
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FirebaseService.removeFromQueue(item.id);
                        } catch (error) {
                            Alert.alert('Lỗi', 'Không thể xóa khỏi hàng đợi');
                        }
                    },
                },
            ]
        );
    };

    const getStatusColor = (status: QueueItem['status']) => {
        switch (status) {
            case 'waiting':
                return '#FFA500';
            case 'called':
                return '#007AFF';
            case 'served':
                return '#28A745';
            default:
                return '#6C757D';
        }
    };

    const getStatusText = (status: QueueItem['status']) => {
        switch (status) {
            case 'waiting':
                return 'Đang chờ';
            case 'called':
                return 'Đã gọi';
            case 'served':
                return 'Đã phục vụ';
            default:
                return 'Không xác định';
        }
    };

    const renderQueueItem = ({ item, index }: { item: QueueItem; index: number }) => (
        <View style={styles.queueItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.position}>#{index + 1}</Text>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>{item.phoneNumber}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                </View>
            </View>

            {isAdmin && (
                <View style={styles.adminActions}>
                    {item.status === 'waiting' && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.callButton]}
                            onPress={() => handleCallNext(item)}
                        >
                            <Text style={styles.actionButtonText}>Gọi</Text>
                        </TouchableOpacity>
                    )}

                    {item.status === 'called' && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.servedButton]}
                            onPress={() => handleServed(item)}
                        >
                            <Text style={styles.actionButtonText}>Đã phục vụ</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.actionButton, styles.removeButton]}
                        onPress={() => handleRemove(item)}
                    >
                        <Text style={styles.actionButtonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Đang tải hàng đợi...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={queueItems}
                renderItem={renderQueueItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Hàng đợi trống</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    queueItem: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    position: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 16,
        color: '#007AFF',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#6C757D',
    },
    statusBadge: {
        marginLeft: 'auto',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    adminActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    callButton: {
        backgroundColor: '#007AFF',
    },
    servedButton: {
        backgroundColor: '#28A745',
    },
    removeButton: {
        backgroundColor: '#DC3545',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#6C757D',
    },
});

export default QueueList;
