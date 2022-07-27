import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import colors from "../colors/Colors";

export default function Home({ route, navigation }) {
    
    const params = route.params;

    return (
        
        <LinearGradient colors={[colors.pink, colors.purple]} style={styles.background}>
            <ScrollView>
                
            </ScrollView>
        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%'
    },

    background: {
        width: '100%',
        height: '100%'
    }
});