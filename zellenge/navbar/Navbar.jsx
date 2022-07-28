import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Navbar = () => (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <Ionicons name="home-outline" size={40} color="white" />
        <Ionicons name="cloud-upload-outline" size={32} color="white" />
        <Ionicons name="cloud-download-outline" size={32} color="white" />
        <Ionicons name="body-outline" size={32} color="white" />
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
      backgroundColor:'rgba(0,0,0,0.8)',
      width: "100%",
      height:"100%",
      maxHeight:45, 
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-around",
      bottom:0
  
  }
});

export default Navbar;