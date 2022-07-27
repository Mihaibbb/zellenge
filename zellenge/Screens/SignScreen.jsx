import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Button, Platform, StyleSheet, Touchable, View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "../colors/Colors";

export default function SignScreen({ route, navigation, title, buttonType, placeholder,  nextScreen, type }) { 
    
    

    const [ inputValue, setInputValue ] = useState("");

    const login = async () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        };
    };

    const signup = async () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        };

    };  
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput secureTextEntry={type === "password" ? true : false} value={inputValue} onChangeText={setInputValue} style={styles.input} placeholder={placeholder} textAlign={'center'}/>
                    
                </View>
             
                {Platform.OS === "ios" ? (
                    <TouchableOpacity style={styles.button} onPress={async () => buttonType === "Continue" ? navigation.navigate(nextScreen) : buttonType === "Login" ? await login() : buttonType === "Sign Up" ? await signup() : null}>
                        <Text style={styles.textContent}>{ buttonType }</Text>
                    </TouchableOpacity>
                ) : Platform.OS === "android" ? (
                    <Button style={styles.button} title={ buttonType } onPress={async () => buttonType === "Continue" ? navigation.navigate(nextScreen) : buttonType === "Login" ? await login() : buttonType === "Sign Up" ? await signup() : null} />
                ) : null}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        
    },

    textContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: 50
    },

    input: {
        width: "100%",
        height: 60,
        textAlign: "center",
        maxWidth: "100%",
        paddingHorizontal: 20,
        marginVertical: 50,
        fontSize: 30,
        fontWeight: 'bold',
        color: "rgba(255, 255, 255, .7)"
    },

    title: {
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: Platform.OS === "ios" ? 50 : 10,
        textAlign: "center",
        color: "rgba(255, 255, 255, .85)",
        
    }, 

    background: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },

    button: {
        width: "100%",
        maxWidth: 300,
        maxHeight: 60,
        marginHorizontal: "auto",
        backgroundColor: "rgba(0, 0, 0, .65)",
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        borderRadius: 40,
        fontWeight: "bold",
        marginBottom: 40
        
    },

    textContent: {
        
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    
    }

});