import { LinearGradient } from "expo-linear-gradient";
import { View, Platform, ScrollView, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import colors from "../colors/Colors";
import Navbar from '../navbar/Navbar';
import { Feather } from "@expo/vector-icons";
import { Video } from 'expo-av';

export default function ChallengesRecieved({route, navigation}) {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
              <Text style={styles.title}>Challenges Recieved</Text> 
              <View style={styles.card}>
                <Pressable style={styles.challenge} >
                    <Video 
                        style={styles.video}
                        source={{ uri: "file:///var/mobile/Containers/Data/Application/8D08C1C1-ED8F-49DD-8043-5CEDDC10D518/Library/Caches/ExponentExperienceData/%2540anonymous%252Fzellenge-4305a2b9-f2b0-492d-805d-a819392d7dd0/Camera/660A309B-0AC8-4974-95D6-DB74C3045CFA.mov"  }}
                        useNativeControls
                        resizeMode='contain'
                        isLooping
                    />
                </Pressable>

                
              </View>
              
              <Navbar route={route} navigation={navigation}/>
              <Pressable style={styles.addButton} onPress={() => navigation.navigate("Camera")}>
                <Feather name="plus" size={40} color="rgba(0, 0, 0, .8)" />
              </Pressable>
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

    video: {
        flex: 1,
        alignSelf: "stretch"
    },

    challenge: {
        width: "100%",
        maxWidth: 195,
        height: 345,
        alignSelf: "center",
        marginTop: 50
    },

    addButton: {
        backgroundColor: "rgba(255, 255, 255, .7)",
        width: 60,
        height: 60,
        position: "absolute",
        bottom: "10%",
        right: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50
    },
});