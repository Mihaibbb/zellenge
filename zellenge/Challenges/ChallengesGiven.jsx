import { LinearGradient } from "expo-linear-gradient";
import { View, Platform, ScrollView, StyleSheet, Text,Pressable } from "react-native";
import colors from "../colors/Colors";
import Navbar from '../navbar/Navbar';

export default function ChallengesGiven({route, navigation}) {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
              <Text style={styles.title}>Challenges Given</Text> 
              <View style={styles.card}>
              <Pressable style={styles.challenge} >
                <Text style={styles.text}>Challenge 1</Text>
            </Pressable>

            <Pressable style={styles.challenge} >
                <Text style={styles.text}>Challenge 2</Text>
            </Pressable>
              </View>
              <Navbar route={route} navigation={navigation}/>
            </LinearGradient>
           
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    text:{
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    },
    challenge:{
        marginTop:15,
        marginBottom:450,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 50
    },
    background: {
        width: '100%',
        height: '100%',

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

    title: {
        fontSize: 30,
        textAlign: "center",
        color: "rgba(255, 255, 255, .6)",
        paddingTop: Platform.OS === "ios" ? 60 : 15,
    },
});