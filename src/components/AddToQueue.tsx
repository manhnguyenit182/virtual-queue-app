import React, { useState, useContext } from 'react';
import { Alert, View } from 'react-native';
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
} from '@gluestack-ui/themed';
import FirebaseService from '../services/FirebaseService';
import Header from './Header';
import { VALIDATION } from '../constants';
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
        <View style={{ flex: 1 }}>
            <Header />
            <Card size="md" variant="elevated" m="$4">
                <VStack space="lg" p="$6">
                    <Heading size="xl" textAlign="center" color="$textLight900">
                        Nhập thông tin
                    </Heading>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText size="md" fontWeight="$semibold">
                                Họ và tên
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="md">
                            <InputField
                                placeholder="Nhập họ và tên"
                                value={name}
                                onChangeText={setName}
                            />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText size="md" fontWeight="$semibold">
                                Số điện thoại
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="md">
                            <InputField
                                placeholder="Nhập số điện thoại"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </Input>
                    </FormControl>

                    <Button
                        size="lg"
                        variant="solid"
                        action="primary"
                        onPress={handleAddToQueue}
                        mt="$2"
                    >
                        <HStack space="sm" alignItems="center">
                            {loading && <Spinner size="small" color="$white" />}
                            <ButtonText>
                                {loading ? 'Đang thêm...' : 'Thêm vào hàng đợi'}
                            </ButtonText>
                        </HStack>
                    </Button>
                </VStack>
            </Card>
        </View>
    );
};

export default AddToQueue;
