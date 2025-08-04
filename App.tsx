/**
 * Virtual Queue System App
 * React Native app with Firebase Realtime Database
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AddToQueue from './src/components/AddToQueue';
import QueueList from './src/components/QueueList';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vui lòng bấm nút để bốc số</Text>
        </View>



        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'add' ? (
            <ScrollView>
              <AddToQueue onSuccess={() => setActiveTab('list')} />
            </ScrollView>
          ) : (
            <QueueList isAdmin={isAdminMode} />
          )}
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  adminToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  adminToggleActive: {
    backgroundColor: 'white',
  },
  adminToggleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  adminToggleTextActive: {
    color: '#007AFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
