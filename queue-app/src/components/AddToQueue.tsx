import React, { useState, useContext } from 'react';
import { Alert, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { NavigationContext } from '../../App';
import {
    VStack,
    HStack,
    Input,
    InputField,
    Button,
    ButtonText,
    Card,
    Heading,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Spinner,
    Text,
} from '@gluestack-ui/themed';
import FirebaseService from '../services/FirebaseService';
import Header from './Header';
import { VALIDATION } from '../constants';

const { width } = Dimensions.get('window');
const AddToQueue: React.FC = () => {
    const navigation = useContext(NavigationContext);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);



    const validateInput = () => {
        if (!name.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên');
            return false;
        }

        if (name.trim().length < VALIDATION.nameMinLength) {
            Alert.alert('Lỗi', `Tên phải có ít nhất ${VALIDATION.nameMinLength} ký tự`);
            return false;
        }

        if (name.trim().length > VALIDATION.nameMaxLength) {
            Alert.alert('Lỗi', `Tên không được vượt quá ${VALIDATION.nameMaxLength} ký tự`);
            return false;
        }

        if (!phoneNumber.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
            return false;
        }

        if (!VALIDATION.phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ (10-11 số)');
            return false;
        }

        return true;
    };

    const handleAddToQueue = async () => {
        if (!validateInput()) return;

        setLoading(true);


        try {
            const queueNumber = await FirebaseService.addToQueue(name.trim(), phoneNumber.trim());

            const position = await FirebaseService.getQueuePosition(queueNumber);

            // Reset the form
            const userName = name.trim();
            setName('');
            setPhoneNumber('');
            console.log('✅ Added to queue successfully:', {
                queueNumber,
                name: userName,
                position: position
            });
            // Navigate to QueueNumber screen with data
            navigation.navigate('QueueNumber', {
                queueNumber: queueNumber,
                name: userName,
                position: position
            });

        } catch (error) {
            console.error('❌ Add to queue error:', error);
            Alert.alert('Lỗi', 'Không thể thêm vào hàng đợi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Chào mừng quý khách!</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Vui lòng điền thông tin để nhận số thứ tự
                    </Text>
                </View>

                <Card size="md" variant="elevated" style={styles.formCard}>
                    <VStack space="lg" p="$6">
                        <FormControl>
                            <FormControlLabel mb="$2">
                                <FormControlLabelText style={styles.labelText}>
                                    Họ và tên *
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="outline" size="md" style={styles.input}>
                                <InputField
                                    placeholder="Nhập họ và tên của bạn"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.inputField}
                                />
                            </Input>
                        </FormControl>

                        <FormControl>
                            <FormControlLabel mb="$2">
                                <FormControlLabelText style={styles.labelText}>
                                    Số điện thoại *
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="outline" size="md" style={styles.input}>
                                <InputField
                                    placeholder="Nhập số điện thoại của bạn"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad"
                                    style={styles.inputField}
                                />
                            </Input>
                        </FormControl>

                        <Button
                            size="lg"
                            variant="solid"
                            action="primary"
                            onPress={handleAddToQueue}
                            mt="$4"
                            style={styles.submitButton}
                            disabled={loading}
                        >
                            <HStack space="sm" alignItems="center">
                                {loading && <Spinner size="small" color="$white" />}
                                <ButtonText style={styles.buttonText}>
                                    {loading ? 'Đang xử lý...' : 'Lấy số thứ tự'}
                                </ButtonText>
                            </HStack>
                        </Button>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                💡 Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho việc quản lý hàng đợi
                            </Text>
                        </View>
                    </VStack>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    welcomeSection: {
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
    },
    formCard: {
        marginHorizontal: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 12,
        backgroundColor: '#ffffff',
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    input: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
    },
    inputField: {
        fontSize: 16,
        color: '#1f2937',
    },
    submitButton: {
        borderRadius: 16,
        backgroundColor: '#6366f1',
        shadowColor: '#6366f1',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
    infoBox: {
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
    },
    infoText: {
        fontSize: 14,
        color: '#1e40af',
        lineHeight: 20,
    },
});

export default AddToQueue;
