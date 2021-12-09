import React from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;