import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { NavigationContext } from '../../App';
import Header from './Header';

const QueueNumber = () => {
    const navigation = useContext(NavigationContext);
    const { queueNumber, name, position } = (navigation.params as any) || {};

    // Disable hardware back button
    React.useEffect(() => {
        const onBackPress = () => {
            console.log('🚫 Hardware back button disabled');
            return true; // Prevent default back action
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription?.remove();
    }, []);



    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.title}>Thành công!</Text>
                <Text style={styles.subtitle}>Chào {name}</Text>

                <View style={styles.numberContainer}>
                    <Text style={styles.numberLabel}>Số thứ tự của bạn</Text>
                    <Text style={styles.number}>{queueNumber}</Text>
                </View>

                <Text style={styles.position}>Vị trí hiện tại: #{position}</Text>



                <Text style={styles.note}>
                    Vui lòng giữ số thứ tự này để được phục vụ
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#22c55e',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    numberContainer: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    numberLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    number: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#6366f1',
    },
    position: {
        fontSize: 16,
        color: '#f59e0b',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    note: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default QueueNumber;
