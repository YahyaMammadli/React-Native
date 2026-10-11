import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from "react-native";

export default function Splash() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const logged = await AsyncStorage.getItem("isLoggedIn");
            router.replace(logged === "true" ? "/home" : "/launch");
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View style={styles.screen}>
            <StatusBar style="light" />
            <Image
                source={require("../../assets/images/launch.png")}
                style={{ width: width * 0.7, height: width * 0.7 * (424 / 290) }}
                contentFit="contain"
            />
            <View style={styles.wordmark}>
                <Text style={styles.wordBurger}>Burger</Text>
                <Text style={styles.wordBite}>Bite</Text>
            </View>
            <ActivityIndicator color="#FF7A18" style={styles.loader} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#1B1B1F",
        alignItems: "center",
        justifyContent: "center",
    },
    wordmark: {
        position: "absolute",
        flexDirection: "row",
        gap: 8,
    },
    wordBurger: {
        color: "#FF7A18",
        fontSize: 36,
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    wordBite: {
        color: "#FFFFFF",
        fontSize: 36,
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    loader: {
        position: "absolute",
        bottom: 80,
    },
});
