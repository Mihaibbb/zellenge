import { LinearGradient } from "expo-linear-gradient";
import { View, Platform, ScrollView, StyleSheet, Text } from "react-native";
import colors from "../colors/Colors";
import Navbar from '../navbar/Navbar';

export default function ChallengesRecieved({route, navigation}) {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
              <Text style={styles.title}>Challenges Recieved</Text> 
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

    background: {
        width: '100%',
        height: '100%',

    },

    title: {
        fontSize: 30,
        textAlign: "center",
        color: "rgba(255, 255, 255, .6)",
        paddingTop: Platform.OS === "ios" ? 60 : 15,
    },
});