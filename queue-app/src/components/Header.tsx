import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundPattern} />
            <View style={styles.content}>
                <Text style={styles.title}>Lấy số thứ tự</Text>
                <Text style={styles.subtitle}>Hệ thống quản lý hàng đợi thông minh</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundPattern: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    content: {
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default Header;
