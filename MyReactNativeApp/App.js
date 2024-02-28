// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth} from './providers/AuthContext.js';
import LoginForm from './components/LoginForm.js';
import MainScreen from './components/MainScreen.js';
import ImageUpload from './components/ImageUpload.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loggedInUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="ImageUpload" component={ImageUpload} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginForm} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
