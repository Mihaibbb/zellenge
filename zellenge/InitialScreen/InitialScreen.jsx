import { View, StyleSheet, Text, Platform, Touchable, TouchableOpacity, Button, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors/Colors";

export default function InitialScreen({ route, navigation }) {                                       
    return (

        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
               
                {Platform.OS === "ios" || Platform.OS === "web" ? (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>Welcome to <Text style={styles.titleName}>Zellenge!</Text></Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EmailLogin")}>
                            <Text style={styles.content}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NameSignup")}>
                            <Text style={styles.content}>Get started</Text>
                        </TouchableOpacity>
                    </View>
                   
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>Welcome to Zellenge</Text>

                        <Pressable title="Login" onPress={() => navigation.navigate("EmailLogin")} />
                        <Pressable title="Get started" onPress={() => navigation.navigate("NameSignup")} />
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",

    },

  
    title: {
        fontSize: 24,
        paddingTop: Platform.OS === "ios" ? 50 : 10,
        textAlign: "center",
        color: "rgba(255, 255, 255, .85)",
        marginTop: -50,
        marginBottom: 50
    
    },  

    titleName: {
        fontWeight: "bold"
    }, 

    background: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center"
    },

    loginContainer: {
        width: "100%",
        height: "100%",
        flex: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    button: {
        width: "100%",
        maxWidth: 300,
        height: 60,
        marginHorizontal: "auto",
        backgroundColor: "rgba(0, 0, 0, .65)",
        marginVertical: 20,
        
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        borderRadius: 40,
        fontWeight: "bold"
    },

    content: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
});