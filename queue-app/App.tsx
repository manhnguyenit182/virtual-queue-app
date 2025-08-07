/**
 * Virtual Queue System App
 * React Native app with Firebase Realtime Database
 * Simple queue management without complex navigation
 *
 * @format
 */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AddToQueue from './src/components/AddToQueue';
import QueueNumberSimple from './src/components/QueueNumberSimple';

// Navigation context for simple screen management
export const NavigationContext = React.createContext({
  navigate: (screen: string, params?: any) => { },
  reset: (routeInfo: any) => { },
  currentScreen: 'AddToQueue',
  params: null,
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState('AddToQueue');
  const [screenParams, setScreenParams] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const navigate = (screen: string, params?: any) => {
    console.log('🧭 Navigating to:', screen, params ? 'with params' : 'no params');
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const reset = (routeInfo: any) => {
    console.log('🔄 Resetting navigation to:', routeInfo.routes[0].name);
    setCurrentScreen(routeInfo.routes[0].name);
    setScreenParams(null);
  };

  const navigationValue = {
    navigate,
    reset,
    currentScreen,
    params: screenParams,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'QueueNumber':
        return <QueueNumberSimple />;
      default:
        return <AddToQueue />;
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <NavigationContext.Provider value={navigationValue}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="#266DD3"
          />
          {renderScreen()}
        </SafeAreaView>
      </NavigationContext.Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
