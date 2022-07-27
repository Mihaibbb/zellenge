import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, Pressable  } from 'react-native';

export default class Account extends Component {

  render() {
    return (
        
      <View style={styles.container}>

       
            <Text style={styles.titlu}>Numele tau</Text>
            <Text style={styles.username}>@username </Text>
            

        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Edit my Profile" 
            color="#fffffff"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
        <Pressable style={styles.button} >
      <Text style={styles.text}>Your Memories</Text>
    </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: '#212121'
  },
  titlu: {
    marginLeft:20,
    marginBottom:5,
    fontSize: 20,
    color: 'white',
    fontWeight: "bold"
  },
  username: {
    marginLeft: 20,
    color: 'white',
    fontSize: 15,
    fontWeight: "300"
  },
  buttonContainer: {
    margin: 20
  },
  text:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 50
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});