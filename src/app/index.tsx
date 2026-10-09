import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { burger } from "@/mock/burger";
import { BurgerType } from "@/types/burger-type";

const FILTERS = ["All", "Beef", "Chicken", "Vegetarian"];
const featuredBurgers = burger.slice(0, 4);

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const menuBurgers = useMemo(
    () =>
      burger.filter(
        (item: BurgerType) =>
          activeFilter === "All" || item.category === activeFilter,
      ),
    [activeFilter],
  );
  const visibleBurgers = showAll ? menuBurgers : menuBurgers.slice(0, 5);

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={["#312d29", "#242329", "#242329"]}
        locations={[0, 0.35, 1]}
        style={styles.panel}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Open menu"
              accessibilityRole="button"
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={21} color="#fff" />
            </Pressable>
            <View style={styles.headerActions}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={17} color="#29282b" />
              </View>
              <Pressable
                accessibilityLabel="Notifications"
                accessibilityRole="button"
                style={styles.notificationButton}
              >
                <Ionicons name="notifications" size={22} color="#fff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Beyond Just Burgers</Text>
            <Text style={styles.subtitle}>It’s a Taste Revolution!</Text>
          </View>

          <View style={styles.filterRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {FILTERS.map((filter) => {
                const selected = filter === activeFilter;
                return (
                  <Pressable
                    key={filter}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => {
                      setActiveFilter(filter);
                      setShowAll(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selected && styles.filterTextActive,
                      ]}
                    >
                      {filter}
                    </Text>
                    {selected && <View style={styles.filterUnderline} />}
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable
              accessibilityLabel="Show all burger categories"
              accessibilityRole="button"
              onPress={() => setActiveFilter("All")}
              style={styles.filterIcon}
            >
              <Ionicons name="filter" size={19} color="#f5f4f2" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredBurgers.map((item: BurgerType) => (
              <View key={item.id} style={styles.featuredCard}>
                <Link href={`/burger/${item.id}/page`} asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`View ${item.title}`}
                    style={styles.featuredLink}
                  >
                    <Image
                      source={item.image}
                      contentFit="contain"
                      style={styles.featuredImage}
                    />
                    <Text numberOfLines={1} style={styles.featuredTitle}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={styles.featuredDescription}
                    >
                      {item.shortDescription}
                    </Text>
                    <Text style={styles.featuredPrice}>
                      Rs {item.price}.00
                    </Text>
                  </Pressable>
                </Link>
                <Pressable
                  accessibilityLabel={`Add ${item.title} to cart`}
                  accessibilityRole="button"
                  onPress={() => setCartCount((count) => count + 1)}
                  style={styles.quickAdd}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </Pressable>
              </View>
            ))}
          </ScrollView>

          <View style={styles.menuHeading}>
            <Text style={styles.sectionTitle}>Menu</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAll((current) => !current)}
            >
              <Text style={styles.seeAll}>{showAll ? "Show less" : "See all"}</Text>
            </Pressable>
          </View>

          <View style={styles.menuList}>
            {visibleBurgers.map((item: BurgerType, index: number) => (
              <View
                key={item.id}
                style={StyleSheet.flatten([
                  styles.menuItem,
                  index === visibleBurgers.length - 1 && styles.lastMenuItem,
                ])}
              >
                <Link href={`/burger/${item.id}/page`} asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`View ${item.title}`}
                    style={styles.menuLink}
                  >
                  <Image
                    source={item.image}
                    contentFit="contain"
                    style={styles.menuImage}
                  />
                  <View style={styles.menuCopy}>
                    <Text numberOfLines={1} style={styles.menuItemTitle}>
                      {item.title}
                    </Text>
                    <View style={styles.rating}>
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Ionicons
                          key={star}
                          name="star"
                          size={13}
                          color="#ffd21f"
                        />
                      ))}
                    </View>
                    <View style={styles.menuMeta}>
                      <Text style={styles.categoryPill}>{item.category}</Text>
                      <Text style={styles.menuPrice}>Rs {item.price}.00</Text>
                    </View>
                  </View>
                  </Pressable>
                </Link>
                <Pressable
                  accessibilityLabel={`Add ${item.title} to cart`}
                  accessibilityRole="button"
                  onPress={() => setCartCount((count) => count + 1)}
                  style={styles.menuAdd}
                >
                  <Ionicons name="add" size={30} color="#fff" />
                </Pressable>
              </View>
            ))}
            {visibleBurgers.length === 0 && (
              <Text style={styles.emptyMessage}>No burgers in this category yet.</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable accessibilityLabel="Discover" accessibilityRole="button">
            <Ionicons name="location-outline" size={22} color="#f4f2f0" />
          </Pressable>
          <Pressable
            accessibilityLabel={`Shopping basket, ${cartCount} items`}
            accessibilityRole="button"
            style={styles.basketButton}
          >
            <Ionicons name="basket-outline" size={25} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
          <Pressable accessibilityLabel="Favorites" accessibilityRole="button">
            <Ionicons name="paw-outline" size={22} color="#f4f2f0" />
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#17171b",
  },
  panel: {
    flex: 1,
    overflow: "hidden",
  },
  scrollContent: {
    paddingTop: 18,
    paddingHorizontal: 19,
    paddingBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    width: 27,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#373531",
    alignItems: "center",
    justifyContent: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#c3ddd1",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationButton: {
    position: "relative",
    paddingRight: 3,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#f0392b",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
  heading: {
    marginTop: 11,
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    color: "#f4f1ef",
    fontSize: 14,
    marginTop: 1,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filters: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 14,
  },
  filterText: {
    color: "#e4e0dc",
    fontSize: 10,
    paddingVertical: 5,
  },
  filterTextActive: {
    color: "#f24a38",
    fontWeight: "700",
  },
  filterUnderline: {
    position: "absolute",
    bottom: -2,
    height: 2,
    left: 0,
    right: 0,
    backgroundColor: "#f24a38",
    borderRadius: 2,
  },
  filterIcon: {
    paddingLeft: 5,
    paddingVertical: 4,
  },
  featuredList: {
    gap: 10,
    paddingBottom: 4,
  },
  featuredCard: {
    width: 132,
    height: 181,
    padding: 9,
    borderWidth: 1,
    borderColor: "#81521f",
    borderRadius: 17,
    backgroundColor: "rgba(31, 30, 33, 0.68)",
    position: "relative",
  },
  featuredLink: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 1,
  },
  featuredImage: {
    width: "100%",
    height: 83,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  featuredDescription: {
    color: "#d0ccca",
    fontSize: 10,
    marginTop: -5,
  },
  featuredPrice: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    paddingRight: 28,
  },
  quickAdd: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#1b1a1e",
    alignItems: "center",
    justifyContent: "center",
  },
  menuHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
    marginBottom: 9,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  seeAll: {
    color: "#a9a5a3",
    fontSize: 10,
  },
  menuList: {
    gap: 6,
  },
  menuItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#302f34",
    borderRadius: 17,
    overflow: "hidden",
  },
  menuLink: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  lastMenuItem: {
    marginBottom: 2,
  },
  menuImage: {
    width: 64,
    height: 62,
    marginLeft: 4,
  },
  menuCopy: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 6,
    paddingVertical: 7,
    minWidth: 0,
  },
  menuItemTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  rating: {
    flexDirection: "row",
    gap: 1,
    marginTop: 1,
  },
  menuMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
  },
  categoryPill: {
    color: "#f3e8e2",
    backgroundColor: "#47363b",
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 9,
  },
  menuPrice: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  menuAdd: {
    width: 49,
    alignSelf: "stretch",
    backgroundColor: "#50363b",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  emptyMessage: {
    color: "#aaa6a3",
    textAlign: "center",
    paddingVertical: 24,
  },
  bottomBar: {
    height: 61,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(29, 28, 32, 0.96)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
  },
  basketButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#df871b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e18a20",
    shadowOpacity: 0.35,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: "#f0392b",
    alignItems: "center",
    justifyContent: "center",
  },
});
