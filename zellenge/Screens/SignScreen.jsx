import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Button, Platform, StyleSheet, Touchable, View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "../colors/Colors";
import getURL from "../address/GetAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignScreen({ route, navigation, title, buttonType, placeholder,  nextScreen, type }) { 
    
    const params = route.params;

    const [ inputValue, setInputValue ] = useState("");

    const login = async (params) => {
        const { email, password } = params;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        };

        try {
            const url = await getURL();
            console.log(url, email, password);
            const request = await fetch(`${url}/api/auth/login`, options);
            const response = await request.json();
            console.log(await response);
            if (await response?.success) {
                await AsyncStorage.setItem("token", await response?.token);
                await AsyncStorage.setItem("logged", JSON.stringify(true));
                navigation.navigate(nextScreen);
            }
            
        } catch (e) {
            console.log(e);
        }
      
        
    };

    const signup = async (params) => {
        console.log("signup");
        const { email, password, name, username } = params;
        console.log(params.email);
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name,
                username
            })
        };

        try {
            const url = await getURL();
        
            const request = await fetch(`${url}/api/auth/register`, options);
            console.log("after");
            const { success, token } = await request.json();
            if (success) {
                console.log(params);
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("logged", JSON.stringify(true));
                await AsyncStorage.setItem("username", username);
                await AsyncStorage.setItem("email", email);
                await AsyncStorage.setItem("name", name);
                navigation.navigate(nextScreen);
            }
        } catch (e) {
            console.log(e);      
        }
        
        
    };  

    const nextPress = async () => {
        if (!inputValue || !inputValue.length) return;
        if (type === "email" && (!inputValue.includes("@") || !inputValue.includes("."))) return;
        const newParams = {...params};
        newParams[type] = inputValue;
        if (type === "password" && inputValue.length < 8) return;
        buttonType === "Continue" ? navigation.navigate(nextScreen, newParams) : buttonType === "Login" ? await login(newParams) : buttonType === "Signup" ? await signup(newParams) : null;
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
                    <TouchableOpacity style={styles.button} onPress={async () => await nextPress()}>
                        <Text style={styles.textContent}>{ buttonType }</Text>
                    </TouchableOpacity>
                ) : Platform.OS === "android" ? (
                    <Button style={styles.button} title={ buttonType } onPress={async () => await nextPress()} />
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
        marginTop: 50,
        maxWidth: "90%"
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
        color: "rgba(255, 255, 255, .7)",
        borderWidth: 0,
        borderColor: "transparent",
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