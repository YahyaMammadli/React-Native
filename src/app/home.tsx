import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BurgerCard from "@/components/main/ui/burger-card";
import { burger, categories } from "@/mock/burger";

type User = { name?: string; email?: string };

export default function Home() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<User>({});
    const [activeCategory, setActiveCategory] = useState(categories[0].id);

    useEffect(() => {
        const load = async () => {
            const [logged, data] = await Promise.all([
                AsyncStorage.getItem("isLoggedIn"),
                AsyncStorage.getItem("data"),
            ]);
            setUser(JSON.parse(data ?? "{}"));
            setIsLoggedIn(logged === "true");
        };
        load();
    }, []);

    const items = useMemo(() => {
        const active = categories.find((c) => c.id === activeCategory);
        if (!active || active.id === categories[0].id) return burger;
        return burger.filter((b) => b.category === active.title);
    }, [activeCategory]);

    const logout = () => {
        Alert.alert("Log out", "Do you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log out",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.multiRemove(["isLoggedIn", "data"]);
                    router.replace("/launch");
                },
            },
        ]);
    };

    if (isLoggedIn === null) {
        return <View style={styles.container} />;
    }

    if (!isLoggedIn) {
        return <Redirect href="/launch" />;
    }

    const initial = (user.name || user.email || "?").slice(0, 1).toUpperCase();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <View style={styles.menuIcon}>
                        <View style={[styles.menuLine, { width: 16 }]} />
                        <View style={[styles.menuLine, { width: 10 }]} />
                        <View style={[styles.menuLine, { width: 16 }]} />
                    </View>
                    <View style={styles.headerRight}>
                        <Pressable onPress={logout} accessibilityLabel="Log out" style={styles.avatar}>
                            <Text style={styles.avatarText}>{initial}</Text>
                        </Pressable>
                        <View>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>2</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Beyond Just Burgers</Text>
                    <Text style={styles.subtitle}>It’s a Taste Revolution!</Text>
                </View>

                <View style={styles.categoryRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
                        {categories.map((category) => (
                            <Pressable key={category.id} onPress={() => setActiveCategory(category.id)}>
                                <Text style={[styles.categoryText, activeCategory === category.id && styles.categoryActive]}>
                                    {category.title}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <Ionicons name="filter" size={20} color="white" />
                </View>

                <FlatList
                    data={items}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={styles.cards}
                    renderItem={({ item }) => (
                        <Link href={`/burger/${item.id}/page`} asChild>
                            <Pressable>
                                <BurgerCard item={item} />
                            </Pressable>
                        </Link>
                    )}
                />

                <View style={styles.menuHeader}>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <Text style={styles.seeAll}>See all</Text>
                </View>

                <View style={styles.menuList}>
                    {items.map((item, index) => (
                        <Link key={item.id} href={`/burger/${item.id}/page`} asChild>
                            <Pressable style={styles.menuItem}>
                                <Image
                                    source={require("../../assets/images/burger.png")}
                                    style={styles.menuImage}
                                    contentFit="contain"
                                />
                                <View style={styles.menuInfo}>
                                    <Text style={styles.menuName} numberOfLines={1}>{item.title}</Text>
                                    <View style={styles.stars}>
                                        {[1, 2, 3, 4, 5].map((n) => {
                                            const rating = index % 2 === 0 ? 5 : 4.5;
                                            const name = n <= rating ? "star" : n - 0.5 <= rating ? "star-half" : "star-outline";
                                            return <Ionicons key={n} name={name} size={12} color="#FFD400" />;
                                        })}
                                    </View>
                                    <View style={styles.menuMeta}>
                                        <View style={styles.chip}>
                                            <Text style={styles.chipText}>{item.category}</Text>
                                        </View>
                                        <Text style={styles.menuPrice}>Rs {item.price}.00</Text>
                                    </View>
                                </View>
                                <View style={styles.menuAdd}>
                                    <Ionicons name="add" size={26} color="white" />
                                </View>
                            </Pressable>
                        </Link>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.tabBar}>
                <Ionicons name="location-outline" size={22} color="white" />
                <LinearGradient colors={["#F6B245", "#E4891E"]} style={styles.basket}>
                    <Ionicons name="basket-outline" size={24} color="white" />
                </LinearGradient>
                <Ionicons name="paw-outline" size={22} color="white" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242329",
    },
    scroll: {
        paddingHorizontal: 14,
        paddingBottom: 24,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    menuIcon: {
        width: 32,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#3A3940",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 8,
        gap: 3,
    },
    menuLine: {
        height: 2.5,
        borderRadius: 2,
        backgroundColor: "#fff",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#B7D9CF",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: "#242329",
        fontSize: 14,
        fontWeight: "700",
    },
    badge: {
        position: "absolute",
        top: -2,
        right: -2,
        minWidth: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#E53935",
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 8,
        fontWeight: "700",
    },
    titleContainer: {
        marginTop: 12,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
    },
    subtitle: {
        color: "#fff",
        fontSize: 14,
    },
    categoryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
        marginBottom: 14,
    },
    categoryList: {
        gap: 26,
        paddingRight: 16,
    },
    categoryText: {
        color: "#fff",
        fontSize: 11,
    },
    categoryActive: {
        color: "#E53935",
        fontWeight: "700",
    },
    cards: {
        gap: 12,
    },
    menuHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 18,
        marginBottom: 10,
    },
    menuTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
    seeAll: {
        color: "#9A9A9F",
        fontSize: 11,
    },
    menuList: {
        gap: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E2D33",
        borderRadius: 14,
        overflow: "hidden",
        height: 70,
    },
    menuImage: {
        width: 56,
        height: 48,
        marginHorizontal: 10,
    },
    menuInfo: {
        flex: 1,
        gap: 3,
    },
    menuName: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
    stars: {
        flexDirection: "row",
        gap: 2,
    },
    menuMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    chip: {
        backgroundColor: "#4A3236",
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    chipText: {
        color: "#fff",
        fontSize: 9,
    },
    menuPrice: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    menuAdd: {
        width: 54,
        height: "100%",
        backgroundColor: "#4A3236",
        alignItems: "center",
        justifyContent: "center",
    },
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 64,
        backgroundColor: "#2B2A30",
    },
    basket: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -14,
        shadowColor: "#F6B245",
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
    },
});
