import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import colors from "../colors/Colors";

export default function SignScreen({ route, navigation, title, placeholder, buttonType, nextScreen, type }) {
    
    const params = route.params;
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {

    }
});