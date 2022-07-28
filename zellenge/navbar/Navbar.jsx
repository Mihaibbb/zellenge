import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableHighlight, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../Home/Home';

const Navbar = ({route,navigation}) => (
  
    <View style={styles.container}>
      <View style={styles.bottomView}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={25} color="white" />
       </Pressable>
       <Pressable onPress={() => navigation.navigate('ChallengesGiven')}>
       <Ionicons name="cloud-upload-outline" size={25} color="white" />
       </Pressable>
        
       <Pressable onPress={() => navigation.navigate('ChallengesRecieved')}>
       <Ionicons name="cloud-download-outline" size={25} color="white" />
       </Pressable>

        <Pressable onPress={() => navigation.navigate('Account')}>
       <Ionicons name="body-outline" size={25} color="white" />
       </Pressable>
      </View >
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"
  },
  bottomView: {
      position:'fixed',
      backgroundColor:'rgba(0,0,0,0.49)',
      width: "100%",
      height:"100%",
      maxHeight:45, 
      alignItems:'center',
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-around",
      bottom:0
  
  }
});

export default Navbar;