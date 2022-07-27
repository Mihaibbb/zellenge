import { View, StyleSheet, Text} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors/Colors";

export default function InitialScreen({ route, navigation }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.pink, colors.purple]}
                style={styles.background}
            >
                <Text>Hello</Text>
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",

    },

    background: {
        width: "100%",
        height: "100%"
    }
});