import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface BurgerCardProps {
    id: number;
    title: string;
    shortDescription: string;
    price: number;
}

export default function BurgerCard({ item }: { item: BurgerCardProps }) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../../assets/images/burger.png")}
                style={styles.image}
                contentFit="contain"
            />
            <View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{item.shortDescription}</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.price}>Rs {item.price}.00</Text>
                <TouchableOpacity style={styles.addButton} accessibilityLabel="Add to cart">
                    <Ionicons name="add" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        borderWidth: 1,
        borderColor: "#81521F",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 6,
    },
    image: {
        width: "100%",
        height: 90,
    },
    title: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
    description: {
        color: "#D8D8D8",
        fontSize: 10,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    addButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});
