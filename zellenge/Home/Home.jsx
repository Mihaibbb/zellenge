import React from 'react';
import {View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors/Colors";

const Home = () => {
  return (
      <View  style={styles.container}>
          <LinearGradient
                    colors={[colors.pink, colors.purple]}
                    style={styles.background}>

                  <Text style={styles.titlu}>
                  Boost your
                  </Text>

                  <Text style={styles.minititlu}>
                  DAILY ACTIVITY
                  </Text>
                
          
              <View style={styles.card}>
              
               

                  <CircularProgress
                      radius={120}
                      style={styles.cerc}
                      value={400}
                      maxValue={500}
                      title={'ZENPOINTS'}
                      subtitle={'Silver'}
                      subtitleColor={'rgba(255,255,255,0.75)'}
                      titleColor={'#7a62d8'}
                      titleStyle={{fontSize: 15}}
                      progressValueColor={'#fff'}
                      activeStrokeWidth={22.69}
                      activeStrokeColor={'#7a62d8'}
                      activeStrokeSecondaryColor={'#5fe3bb'}
                      delay={50}
                    />
              </View>
            </LinearGradient>
        </View>
        
      
      
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    height: '100%'
  },
  card:{
      marginTop: 15,
      width: "100%",
      height: "100%",
      maxWidth: "80%",
      maxHeight: "50%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      alignSelf: "center",
      alignItems: "center", 
      justifyContent:"center",
      borderRadius: 20
  },
  background: {
        width: "100%",
        height: "100%",
        flex: 1,
       flexDirection: "column",
       paddingTop: Platform.OS === "ios" ? 55 : 20
  },
  titlu:{
    marginTop:20,
    marginLeft:20,
    marginBottom:1,
    fontSize: 30,
    color: 'rgba(255,255,255,0.75 )',
    fontWeight: "bold"
  },
  minititlu:{
    marginTop:20,
    marginLeft:20,
    marginBottom:1,
    fontSize:35,
    color: 'white',
    fontWeight: "900"
  },
  fundal:{
    padding: 20,
    color:'black',
    height: 100,
    width: 100
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
  },
  cerc: {
    flex: 1,
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  },
  scrollContainer: {
    minWidth: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
