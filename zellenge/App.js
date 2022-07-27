import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from './InitialScreen/InitialScreen';
import SignScreen from './Screens/SignScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Initial' 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Initial" component={InitialScreen}/>
        <Stack.Screen name="EmailLogin">
          {(props) => <SignScreen {...props} title="Please enter here your email: " placeholder="Your email" buttonType="continue" type="email" nextScreen="PaswordLogin" />}
        </Stack.Screen>
        <Stack.Screen name="PasswordLogin">
          {(props) => <SignScreen {...props} title="Please enter your password here: " placeholder="Your password" buttonType="login" type="password" nextScreen="Home" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


