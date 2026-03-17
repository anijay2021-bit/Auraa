import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo mark */}
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>A</Text>
      </View>

      {/* Headline */}
      <Text style={styles.title}>Auraa</Text>
      <Text style={styles.tagline}>Stop guessing. Start glowing.</Text>
      <Text style={styles.subtitle}>
        AI-powered color analysis for every skin tone, every woman, everywhere.
      </Text>

      {/* CTA */}
      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push("/analyze")}
        accessibilityRole="button"
        accessibilityLabel="Discover My Palette"
      >
        <Text style={styles.primaryButtonText}>Discover My Palette</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/wardrobe")}
        accessibilityRole="button"
        accessibilityLabel="My Wardrobe"
      >
        <Text style={styles.secondaryButtonText}>My Wardrobe</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FDF7F2",
    gap: 12,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7B2D5E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#7B2D5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: "#FDF7F2",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2C2C2C",
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: "#C4698F",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#2C2C2C99",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
    maxWidth: 280,
  },
  primaryButton: {
    backgroundColor: "#7B2D5E",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    shadowColor: "#7B2D5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#FDF7F2",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#7B2D5E",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#7B2D5E",
    fontSize: 16,
    fontWeight: "600",
  },
});
