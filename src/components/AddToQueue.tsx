import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import FirebaseService from '../services/FirebaseService';

interface AddToQueueProps {
    onSuccess?: (queueId: string) => void;
}

const AddToQueue: React.FC<AddToQueueProps> = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        if (!name.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên');
            return false;
        }

        if (!phoneNumber.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
            return false;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return false;
        }

        return true;
    };

    const handleAddToQueue = async () => {
        if (!validateInput()) return;

        setLoading(true);
        try {
            const queueId = await FirebaseService.addToQueue(name.trim(), phoneNumber.trim());
            const position = await FirebaseService.getQueuePosition(queueId);

            Alert.alert(
                'Thành công',
                `Đã thêm ${name} vào hàng đợi.\nVị trí hiện tại: ${position}`,
                [{
                    text: 'OK', onPress: () => {
                        setName('');
                        setPhoneNumber('');
                        onSuccess?.(queueId);
                    }
                }]
            );
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể thêm vào hàng đợi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm vào hàng đợi</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên khách hàng</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên khách hàng"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Nhập số điện thoại"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity
                style={[styles.addButton, loading && styles.disabledButton]}
                onPress={handleAddToQueue}
                disabled={loading}
            >
                <Text style={styles.addButtonText}>
                    {loading ? 'Đang thêm...' : 'Thêm vào hàng đợi'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    disabledButton: {
        backgroundColor: '#CCC',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddToQueue;
