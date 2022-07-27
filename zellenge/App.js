import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialScreen from './InitialScreen/InitialScreen';
import SignScreen from './Screens/SignScreen';
import Account from './account/Account';
import Home from './Home/Home';
<<<<<<< HEAD
import Navbar from './navbar/Navbar';
=======
import ChallengesGiven from './Challenges/ChallengesGiven';
import ChallengesRecieved from './Challenges/ChallengesRecieved';
>>>>>>> a1b84817bd05fb42efc18b35f3c34ee0ea84ec1f

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLogged(JSON.parse(await AsyncStorage.getItem("logged")));
    })();
  }, []);

  return isLogged !== null && (
    <NavigationContainer>
      <Stack.Navigator 
<<<<<<< HEAD
        initialRouteName={isLogged ? 'Navbar' : 'Navbar'}
=======
        initialRouteName={!isLogged ? 'ChallengesGiven' : 'ChallengesGiven'}
>>>>>>> a1b84817bd05fb42efc18b35f3c34ee0ea84ec1f
        screenOptions={{
          headerShown: false
        }}
      >
    
        <Stack.Screen name="Initial" component={InitialScreen}/>
        <Stack.Screen name="Initial" component={Navbar}/>
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen name="EmailLogin">
          {(props) => <SignScreen {...props} title="What's your email? " placeholder="Your email" buttonType="Continue" type="email" nextScreen="PasswordLogin" />}
        </Stack.Screen>

        <Stack.Screen name="PasswordLogin">
          {(props) => <SignScreen {...props} title="What's your password?" placeholder="Your password" buttonType="Login" type="password" nextScreen="Home" />}
        </Stack.Screen>

        <Stack.Screen name="NameSignup">
          {(props) => <SignScreen {...props} title="What's your name?" placeholder="Your name..." buttonType="Continue" type="name" nextScreen="UsernameSignup" />}
        </Stack.Screen>

        <Stack.Screen name="UsernameSignup">
          {(props) => <SignScreen {...props} title="What's your username? " placeholder="Your username..." buttonType="Continue" type="username" nextScreen="EmailSignup" />}
        </Stack.Screen>

        <Stack.Screen name="EmailSignup">
          {(props) => <SignScreen {...props} title="What's your email? " placeholder="Your email..." buttonType="Continue" type="email" nextScreen="PasswordSignup" />}
        </Stack.Screen>

        <Stack.Screen name="PasswordSignup">
          {(props) => <SignScreen {...props} title="What's your password? " placeholder="Your password..." buttonType="Signup" type="password" nextScreen="Home" />}
        </Stack.Screen>

        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="ChallengesGiven" component={ChallengesGiven} />

        <Stack.Screen name="ChallengesRecieved" component={ChallengesRecieved} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


