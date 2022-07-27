import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, Pressable, Image  } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors/Colors";
import Moment from 'moment';
import photo from '../img/nouserphoto.png'; 


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }
    
      onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
      }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
        
      <View style={styles.container}>

            <View style={styles.centru}>
              <Image source={photo} style={styles.poza}/> 
            </View>
            <Text style={styles.titlu}>Numele tau</Text>
            <Text style={styles.username}>@username </Text>
            
          <Pressable onPress={this._onPressButton} style={styles.buttonx}
            color="#202020"

          >
            <Text style={styles.profil} >EDIT MY PROFILE</Text>
          </Pressable>

        <Pressable style={styles.button} >
                <Text style={styles.text}>Your Badges</Text>
            </Pressable>

            <Pressable style={styles.button} >
                <Text style={styles.text}>Your Memories</Text>
            </Pressable>
        
        <View style={styles.calendar}>
             <LinearGradient 
                colors={[colors.amore, colors.night]}
                style={[styles.calendar]}>
    
                    <CalendarPicker
                    textStyle={{color: 'white'}}
                    todayTextStyle={{fontWeight: 'bold', color:'black'}}
                    selectedDayColor="rgba(0, 0, 0, .45)"
                    selectedDayTextColor="white"
                    
                onDateChange={this.onDateChange}
                    />
             </LinearGradient>
        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'black'
  },
  profil:{
    marginLeft:20,
    marginBottom:1,
    fontSize: 15,
    color: 'white',
    fontWeight: "bold"
  },
  poza: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    marginBottom:20,
    marginLeft:15
  },
  centru: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titlu: {
    marginLeft:20,
    marginBottom:1,
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
    margin: 20,
    borderRadius:90
  },
  text:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  button:{
    marginTop:15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 50
  },
  buttonx:{
    marginTop:15,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 'auto',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#202020",
    borderRadius: 50
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calendar: {
    borderRadius: 10,
    defaultBackgroundColor: 'black',
    margin: 5
  }
});