
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import colors from '../colors/Colors';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getURL from '../address/GetAddress';
import * as FileSystem from "expo-file-system";

export default function CameraView({ route, navigation }) {

    const cameraRef = useRef();
    const [type, setType] = useState();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
  
    const params = route.params;
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }

    let recordVideo = () => {
        setIsRecording(true);
        let options = {
            quality: "auto",
            maxDuration: 60,
            mute: false
        };

        cameraRef.current.recordAsync(options).then((recordedVideo) => {
            setVideo(recordedVideo);
            setIsRecording(false);
        });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
       
    };

    if (video) {
        console.log(video.uri);
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        let saveVideo = () => {
            MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        const sendVideo = async () => {
            console.log('got here', video);
            const newVideoUri = Platform.OS === "ios" ? video.uri.split("file://")[1] : video.uri;
            const formData = new FormData();
            formData.append('file333', video.uri);
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: params?.name,
                    video: newVideoUri,
                    username: await AsyncStorage.getItem("username")
                })
            };

            try {
                const url = await getURL();

                navigation.navigate("Home");
                

            } catch (e) {
                console.log(e);
            }

           
        };

        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode='contain'
                    isLooping
                />
                <Button title="Send" onPress={async () => await sendVideo()}/>
                <Button title="Share" onPress={shareVideo} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={saveVideo} /> : undefined}
                <Button title="Discard" onPress={() => setVideo(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef} type={type}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.recordButton} onPress={() => isRecording ? stopRecording() : recordVideo()}>
                    <LinearGradient colors={isRecording ? [colors.pink, colors.purple]: ["transparent", "transparent"]} style={styles.buttonGradient}>

                    </LinearGradient>
                </TouchableOpacity>
                
                {!isRecording && <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.revertContainer} >
                    <Ionicons name="camera-reverse-outline" size={40} color="#fff" style={styles.revertIcon} />
                </TouchableOpacity>}
  
            </View>
        </Camera>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
       
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 30,
        flexDirection: "row",
        
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },

    recordButton: {
        width: 100,
        height: 100,
        borderRadius: 100,
        
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, .9)"
    },

    revertContainer: {
        alignSelf: "center",
        marginLeft: 30,
        marginRight: -70
    },

    buttonGradient: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    }

    
});