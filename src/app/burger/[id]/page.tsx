import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { burger } from "@/mock/burger";
import { BurgerType } from "@/types/burger-type";

export default function BurgerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const burgerId = Number(Array.isArray(id) ? id[0] : id);
  const selectedBurger = burger.find(
    (item: BurgerType) => item.id === burgerId,
  );

  if (!selectedBurger) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.panel}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={25} color="#fff" />
          </Pressable>
          <Text style={styles.notFound}>Burger not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageHeight = Math.min(width * 0.76, 300);
  const totalPrice = selectedBurger.price * quantity;

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={["#302d2a", "#242329", "#242329"]}
        locations={[0, 0.35, 1]}
        style={styles.panel}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.topAction}
          >
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </Pressable>
          <Pressable
            accessibilityLabel="More options"
            accessibilityRole="button"
            style={styles.topAction}
          >
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.hero, { height: imageHeight }]}>
            <View style={styles.imageShadow} />
            <Image
              source={selectedBurger.image}
              contentFit="contain"
              style={styles.burgerImage}
            />
          </View>

          <View style={styles.copy}>
            <Text style={styles.title}>{selectedBurger.title}</Text>
            <Text style={styles.description}>
              {selectedBurger.description}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.purchaseRow}>
            <View style={styles.stepper}>
              <Pressable
                accessibilityLabel="Increase quantity"
                accessibilityRole="button"
                onPress={() => {
                  setQuantity((current) => current + 1);
                  setAddedToCart(false);
                }}
                style={styles.stepButton}
              >
                <Ionicons name="add" size={21} color="#fff" />
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable
                accessibilityLabel="Decrease quantity"
                accessibilityRole="button"
                disabled={quantity === 1}
                onPress={() => {
                  setQuantity((current) => Math.max(1, current - 1));
                  setAddedToCart(false);
                }}
                style={[
                  styles.stepButton,
                  quantity === 1 && styles.stepButtonDisabled,
                ]}
              >
                <Ionicons name="remove" size={21} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.priceBlock}>
              <Text style={styles.priceLabel}>Total price</Text>
              <Text style={styles.priceValue}>
                Rs {totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setAddedToCart(true)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <LinearGradient
              colors={["#f39a22", "#d47b1b"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cartButton}
            >
              <Ionicons
                name={addedToCart ? "checkmark" : "basket-outline"}
                size={21}
                color="#fff"
              />
              <Text style={styles.cartLabel}>
                {addedToCart ? "Added to cart" : "Add to cart"}
              </Text>
            </LinearGradient>
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
  topBar: {
    height: 48,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topAction: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContent: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageShadow: {
    position: "absolute",
    bottom: 24,
    width: "55%",
    height: 15,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.42)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 13,
  },
  burgerImage: {
    width: "100%",
    height: "100%",
  },
  copy: {
    gap: 11,
    marginTop: 1,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  description: {
    color: "#f1eff0",
    fontSize: 12,
    lineHeight: 17,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 19,
    gap: 25,
  },
  purchaseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 24,
    backgroundColor: "#302f34",
    padding: 5,
  },
  stepButton: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#3b3a40",
    alignItems: "center",
    justifyContent: "center",
  },
  stepButtonDisabled: {
    opacity: 0.65,
  },
  quantity: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    minWidth: 13,
    textAlign: "center",
  },
  priceBlock: {
    alignItems: "flex-start",
    minWidth: 116,
  },
  priceLabel: {
    color: "#d2ced0",
    fontSize: 9,
    marginBottom: 2,
  },
  priceValue: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.1,
  },
  cartButton: {
    height: 43,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  cartLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
  },
  notFound: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 36,
  },
  backButton: {
    width: 40,
    height: 40,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
