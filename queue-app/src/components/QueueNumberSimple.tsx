import React, { useContext } from 'react';
import { View, Text, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { NavigationContext } from '../../App';
import Header from './Header';
import FirebaseService from '../services/FirebaseService';
const { width } = Dimensions.get('window');

const QueueNumber = () => {
  const navigation = useContext(NavigationContext);
  const { queueNumber, name, position } = (navigation.params as any) || {};
  const [currentNum, setCurrentNum] = React.useState<number>(0);
  const [timeRemain, setTimeRemain] = React.useState<number>(0);
  React.useEffect(() => {
    // Setup realtime listener for current number
    const currentListener = FirebaseService.subscribeToCurrentNumber((currentNumber: number) => {
      setCurrentNum(currentNumber);
      setTimeRemain((queueNumber - currentNumber) * 5);
    });

    // Cleanup listener on unmount
    return () => {
      if (currentListener) {
        currentListener();
      }
    };
  }, []);

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
        <View style={styles.successIcon}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.title}>Thành công!</Text>
        <Text style={styles.subtitle}>Chào mừng {name}</Text>

        <View style={styles.numberCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.numberLabel}>Số thứ tự của bạn</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.number}>{queueNumber}</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.positionBadge}>
              <Text style={styles.positionText}>Số hiện tại: {currentNum}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Hướng dẫn</Text>
          <Text style={styles.infoText}>
            • Vui lòng giữ số thứ tự này để được phục vụ{'\n'}
            • Thời gian chờ ước tính: {timeRemain} phút{'\n'}
            • Quý khách sẽ được gọi theo thứ tự
          </Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // marginBottom: 54,
    top: -20,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  checkMark: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  numberCard: {
    width: width - 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  numberLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardBody: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  number: {
    fontSize: 64,
    fontWeight: '900',
    color: '#6366f1',
    textAlign: 'center',
    letterSpacing: -2,
  },
  cardFooter: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  positionBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  positionText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  infoCard: {
    width: width - 48,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 6,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    fontWeight: '400',
  },
});

export default QueueNumber;
